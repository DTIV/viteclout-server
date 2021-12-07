import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" })
);

export default router;
