import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
  },
  isVuilder: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String,
    default: "",
  },
  header: {
    type: String,
    required:false,
  },
  blog: {
    type: String,
    required: false,
  },
  github: {
    type:String,
    required: false
  }
});

const User = mongoose.model("User", userSchema);

export default User;
