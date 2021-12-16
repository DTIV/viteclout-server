import express from "express";
import viteController from "../controller/vite/viteController";
const router = express.Router();

router.get("/height", async (req, res) => {
  try {
    const result = await viteController.getSnapshotChainHeight();
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
  }
});

router.get("/add", async (req, res) => {
  try {
    const result = await viteController.deployTokenContract();
    return res.status(201).send(result);
  } catch (err) {
    console.log(err)
  }
});

router.get("/call", async (req, res) => {
  try{
    console.log("call")
  }catch (err) {
    console.log(err)
  }
})

export default router;
