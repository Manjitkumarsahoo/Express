import express from "express"
import { allUser } from "../controller/userController.js";
import { createUser } from "../controller/userController.js";
import { userLogin } from "../controller/userController.js";
import { userUpdate } from "../controller/userController.js";
import { deleteUser } from "../controller/userController.js";

const userRouter = express.Router();

// userRouter.get("/",(req,res)=>{
//     res.send("The user Router is Working")
// })

//create user
userRouter.post("/add",createUser)

//user api
userRouter.get("/alluser",allUser);

//user login
userRouter.post("/login",userLogin)


//update user
userRouter.put("/update",userUpdate);

//delete user
userRouter.delete("/delete",deleteUser)




export default userRouter;