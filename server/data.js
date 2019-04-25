// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const postSchema = new Schema(
  {
    title: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    skills: String,
    numFlags: Number
  },
  { timestamps: true }
);

const userSchema = new Schema({
  username: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  isModerator: { type: Boolean, default: false }
});

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    content: String,
    userFrom: { type: Schema.Types.ObjectId, ref: "User" },
    conversation: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports.Post = mongoose.model("Post", postSchema);
module.exports.User = mongoose.model("User", userSchema);
module.exports.Message = mongoose.model("Message", messageSchema);
module.exports.Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
