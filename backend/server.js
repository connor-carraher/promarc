const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://promarc:password1@ds045614.mlab.com:45614/promarc";

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//const cookieSession = require("cookie-session");

// cookieSession config
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000 // One day in milliseconds
//   })
// );

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
      callbackURL: "http://localhost:3000/callback"
      // callbackURL: "http://localhost:3001/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return done(err, user);
      });
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
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

// this is our get method
// this method fetches all available data in our database

router.get("/posts", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/post/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/putData", (req, res) => {
  let data = new Data();

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
