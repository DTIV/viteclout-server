import express from "express";
import User from "../../models/user";

export const findOrCreate = async (twitterId: string) => {
  try {
    const res = await User.find({
      twitterId,
    });
    if (res) {
      return res;
    } else {
      const newUser = new User({
        twitterId,
        description: "",
      });
      const res = await newUser.save();
      return res._id;
    }
  } catch (err) {
    console.log("Error while adding to db");
  }
};

export const addUser = async (twitterId: string, description: string) => {
  try {
    const newUser = new User({
      twitterId,
      description,
    });
    const res = await newUser.save();
    return res._id;
  } catch (err) {
    console.log("Error while adding to db");
  }
};

export const addUserAndCreateToken = () => {};

export default {
  findOrCreate,
  addUser,
};
