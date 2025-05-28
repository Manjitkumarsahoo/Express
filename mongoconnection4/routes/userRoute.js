import express from "express"
import userModel from "../model/userModel.js"

const userRouter = express.Router();

// userRouter.get("/",(req,res)=>{
//     res.send("The user Router is Working")
// })

userRouter.post("/add",async (req,res)=>{
    try {
        let data=req.body
        let response = await userModel.insertOne(data);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})

userRouter.get("/all-user",async (req,res)=>{
    //get all user from db
    try {
        const users = await userModel.find()
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
})

export default userRouter;