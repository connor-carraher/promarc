const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { Post, User, Conversation, Message } = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://promarc:password1@ds045614.mlab.com:45614/promarc";

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const cookieSession = require("cookie-session");

//cookieSession config
app.use(
  cookieSession({
    keys: ["thiskeyisusedforencryption"],
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    httpOnly: false
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "307499592437-dln10svivbmo837h0vs0n7jp21rtrd9m.apps.googleusercontent.com",
      clientSecret: "5IMMEpqFev9TG8NF6xMrtZeR",
      callbackURL: "http://localhost:3001/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      if (profile._json["domain"] != "scu.edu") {
        return done(new Error("Invalid host domain"));
      }

      const username = profile.emails[0]["value"];

      User.findOne(
        {
          username: username
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              username: username
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"]
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login"
  }),
  function(req, res) {
    //res.send(req.user);
    res.redirect("http://localhost:3000/");
  }
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/*
 *
 *
 *   Post Endpoints
 *
 */

//Get All Posts
router.get("/posts", (req, res) => {
  Post.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//Get Post by ID
router.get("/post/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//Post Editing
router.post("/post/edit/:id", (req, res) => {
  const { id, update } = req.body;

  var query = { _id: id };
  Post.updateOne(query, {
    $set: {
      title: update.title,
      skills: update.skills,
      description: update.description
    }
  }).exec();

  // Post.findOneAndUpdate(query, update).exec();
});

//Post Deletion
router.delete("/post/delete/:id", (req, res) => {
  const { id } = req.params.id;

  var query = { id: id };
  var index = req.user.posts.indexOf(req.params.id);
  req.user.posts.splice(index, 1);
  User.update(query, req.user).exec();

  Post.findByIdAndDelete(req.params.id).exec();
});

//Post Creation
router.post("/putData", (req, res) => {
  let data = new Post();

  const { description, title, skills } = req.body;

  if (!description || !title || !skills) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  data.title = title;
  data.description = description;
  data.skills = skills;
  data.createdBy = req.user;

  var query = { username: req.user.username };
  User.update(query, { $push: { posts: data } }).exec();

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

/*
 *
 *
 *   User Endpoints
 *
 */

//Get all users
router.get("/users", (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//Get user by ID
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//User Creation
router.post("/putUser", (req, res) => {
  let data = new User();
  const { username } = req.body;
  data.username = username;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//Update User
router.post("/updateUser", (req, res) => {
  const { id, update } = req.body;
  User.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//Get logged in user
router.get("/getCurrUser", (req, res) => {
  return res.json({ success: true, userId: req.user._id });
});

/*
 *
 *
 *   Message Endpoints
 *
 */

/*
 *
 *
 *   Conversation Endpoints
 *
 */

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
