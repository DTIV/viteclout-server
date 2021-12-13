import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: Boolean,
        default: false,
      },
      email: {
        type: String,
        default: "",
      }
    },
    { timestamps: true }
  );

  const Admin = mongoose.model("Admin", adminSchema);

  export default Admin;