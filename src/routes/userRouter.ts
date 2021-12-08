import express from "express";
import userController from "../controller/user/userController";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { twitterId, isVuilder, profilePic, header, blog, github } = req.body;
    const id = await userController.addUser(twitterId, isVuilder, profilePic, header, blog, github);
    return res.status(201).send(id);
  } catch (err) {
    console.log(err);
  }
});

export default router;
