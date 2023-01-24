const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  artistLink: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
    required: true,
  }, //=> cloudinary / online source,
//   comments: [
//     {
//       message: String,
//       user: { type: Schema.Types.ObjectId, ref: "User" },
//     },
//   ],
}); // maybe implement animal tags for a search function?

const Post = model("Post", postSchema);

module.exports = Post;
