import mongoose from "mongoose";
import prodSchema from "../schema/prodSchema.js";

const prodModel = mongoose.model("Prods", prodSchema);

export default prodModel;