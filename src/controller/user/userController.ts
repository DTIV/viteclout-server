import express from "express";
import User from "../../models/user";

export const findOrCreate = async (twitterId: string, twitterIdNumber: string) => {
  try {
    const res = await User.find({ twitterId : twitterId });
    if (res.length) {
      return res;
    } else {
      const newUser = await new User({
        twitterId,
        twitterIdNumber
      });
      const res = await newUser.save();
      return res;
    }
  } catch (err) {
    console.log("Error while adding to db", err);
  }
};

export const addUser = async (twitterId: string, twitterIdNumber:string, isVuilder: boolean, profilePic: string, header: string, blog: string, github: string) => {
  try {
    const newUser = new User({
      twitterId,
      twitterIdNumber,
      isVuilder,
      profilePic,
      header,
      blog,
      github
    });
    const res = await newUser.save();
    return res._id;
  } catch (err) {
    console.log("Error while adding to db", err);
  }
};

export const addUserAndCreateToken = () => {};

export default {
  findOrCreate,
  addUser,
};
