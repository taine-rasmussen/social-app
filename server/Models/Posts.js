import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    loaction: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    // Map over Array - O(1) v o(n)
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
export default Post