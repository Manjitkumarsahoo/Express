import express from "express"
import prodModel from "../model/prodModel.js";

const prodRouter = express.Router();

prodRouter.get("/",(req,res)=>{
    res.send("The prod Router is Working")
})

prodRouter.post("/add",async (req,res)=>{
    try {
        let data=req.body
        let response = await prodModel.insertMany(data);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})

export default prodRouter;

