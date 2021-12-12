
import Admin from "../../models/admin";

export const addSuperUser = async (username: string, password: string, email:string) => {
  try {
    const newSuperUser = new Admin({
      username,
      password,
      email
    });
    const res = await newSuperUser.save();
    return res._id;
  } catch (err) {
    console.log("Error while adding to db", err);
  }
};

export default { addSuperUser };
  