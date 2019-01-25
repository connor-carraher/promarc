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

/*
 *
 *
 *   Post Endpoints
 *
 */
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
