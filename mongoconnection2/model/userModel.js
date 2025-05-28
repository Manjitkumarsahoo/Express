import userSchema from "../schema/userSchema.js";
import mongoose from "mongoose";

const userModel= mongoose.model("Users",userSchema);

export default userModel;
