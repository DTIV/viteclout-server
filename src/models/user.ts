import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    twitterId: {
      type: String,
      required: true,
      unique: true
    },
    isVuilder: {
      type: Boolean,
      default: false,
      required: true
    },
    profilePic: {
      type: String,
      default: "",
      required: false
    },
    header: {
      type: String,
      default: "",
      required:false,
    },
    blog: {
      type: String,
      default: "",
      required: false
    },
    github: {
      type:String,
      default: "",
      required: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
