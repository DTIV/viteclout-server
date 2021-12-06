import express from "express";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    return res.status(201).send("Server is up");
  } catch (err) {
    console.log(err);
  }
});

export default router;
