import express from "express";

const router = express.Router();

router.get("/twitter", async (req, res) => {
  try {
    return res.status(201).send("hello");
  } catch (err) {
    console.log(err);
  }
});

export default router;
