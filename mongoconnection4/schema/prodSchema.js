import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    price: { type: Number, required: true }
})

export default prodSchema;