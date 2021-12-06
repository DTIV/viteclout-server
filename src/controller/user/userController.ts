import User from "../../models/user";

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

export default {
  addUser,
};
