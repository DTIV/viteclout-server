import express from "express";
import adminController from "../controller/superuser/adminController";
import User from "../models/user";

const router = express.Router();

// ADD USER
router.post("/add/superuser", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(req.body)
    const id = await adminController.addSuperUser(username, password, email);
    return res.status(201).send(id);
  } catch (err) {
    console.log(err);
  }
});

export default router;