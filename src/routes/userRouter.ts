import express from "express";
import userController from "../controller/user/userController";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { twitterId, description } = req.body;
    const id = await userController.addUser(twitterId, description);
    return res.status(201).send(id);
  } catch (err) {
    console.log(err);
  }
});

export default router;
