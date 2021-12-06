import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
