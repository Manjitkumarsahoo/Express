import express from "express"
import userModel from "../model/userModel.js"


const userRouter = express.Router()        //create router using express.Router method


userRouter.get("/", (req,res) => {
    res.send("The User Router is Working")
})

userRouter.post("/add", async (req, res) => {
    try {
        let data = req.body                              //recive the data from Api
        let response= await userModel.insertOne(data)   //insert the data from api to database
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})


export default userRouter;
