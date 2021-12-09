import express from "express";
import userController from "../controller/user/userController";
import User from "../models/user";

const router = express.Router();

// ADD USER
router.post("/add", async (req, res) => {
  try {
    const { twitterId, isVuilder, profilePic, header, blog, github } = req.body;
    console.log(req.body)
    const id = await userController.addUser(twitterId, isVuilder, profilePic, header, blog, github);
    return res.status(201).send(id);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL USERS
router.get('/list', function (req, res) {
  User.find({}, function (err, users) {
    if(!err){
      res.json(users)
    }else{
      res.status(401).json(err);
    }
  })
});

//GET USER
router.get('/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    res.status(200).json(user)
  }catch (err){
    res.status(500).json("Failed!")
  }
});



// UPDATE USER
router.put("/update/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
      }, 
      {new: true})
      res.status(200).json(updatedUser)
    }catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("Failed!");
  }
});

// DELETE USER
router.delete("/delete/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted!")
    }catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("Failed!");
  }
});

export default router;
