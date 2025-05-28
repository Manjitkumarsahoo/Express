import express from "express"
import userModel from "../model/userModel.js"

const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
    res.send("The user Router is Working")
})

userRouter.post("/add",async (req,res)=>{
    try {
        let data=req.body
        let response = await userModel.insertOne(data);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})

export default userRouter;