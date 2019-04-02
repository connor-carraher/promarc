const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { Post, User, Conversation, Message } = require("./data");
require("dotenv").config();

const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://promarc:password1@ds257858.mlab.com:57858/promarc";

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
      callbackURL:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001/api/auth/google/callback"
          : "http://connorcarraeher.com/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      /*if (profile._json["domain"] != "scu.edu") {
        return done(new Error("Invalid host domain"));
      } */

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
    failureRedirect:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/login"
        : "http://promarc-prod.com/login"
  }),
  function(req, res) {
    if (process.env.NODE_ENV === "development") {
      res.redirect("http://localhost:3000/");
    } else {
      res.redirect("http://promarc-prod.com/");
    }
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
  var createdBy;

  Post.findById(req.params.id).exec(function(error, result) {
    createdBy = result.createdBy;
    User.findById(createdBy).exec(function(error, result2) {
      var index = result2.posts.indexOf(id);
      result2.posts.splice(index, 1);
      User.update({ _id: createdBy }, result2).exec();
    });
  });

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
  return res.json({ success: true, user: req.user });
});

// router.get("/getCurrUser/conversations", (req, res) => {
//   var id = req.user._id;
//   console.log(id);
//   User.findById(id, (err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

/*
 *
 *
 *   Message Endpoints
 *
 */
router.post("/conversation/message/update/:id", (req, res) => {
  let data = new Message();
  conversationId = req.params.id;

  data.content = req.body.content;
  data.userFrom = req.user._id;
  data.conversation = conversationId;

  var query = { _id: conversationId };
  Conversation.updateOne(query, { $push: { messages: data } }).exec();

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/conversation/messages/:id", (req, res) => {
  var query = { conversation: req.params.id };
  Message.find(query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/conversation/message/:id", (req, res) => {
  var query = { conversation: req.params.id };
  Message.find(query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      data: data[data.length - 1]
    });
  });
});

/*
 *
 *
 *   Conversation Endpoints
 *
 */

//Create conversation
router.post("/conversation/create", (req, res) => {
  let data = new Conversation();

  const { receiver, sender } = req.body;

  data.participants.push(receiver);
  data.participants.push(sender);

  var query = { _id: sender };
  User.update(query, { $push: { conversations: data } }).exec();

  var query = { _id: receiver };
  User.update(query, { $push: { conversations: data } }).exec();

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//Get all conversations by user id
router.get("/conversations/user", (req, res) => {
  var query = { _id: req.user._id };
  User.findById(query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//Get conversation by conversation id
router.get("/conversation/:id", (req, res) => {
  var query = { _id: req.params.id };
  Conversation.findOne(query, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//Get recipient by conversation id
router.get("/conversation/user/:id", (req, res) => {
  var query = { _id: req.params.id };
  Conversation.findOne(query).exec(function(error, result) {
    participants = result.participants;
    if (req.user.id == participants[0]) {
      User.findById(participants[1], (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    } else {
      User.findById(participants[0], (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    }
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
