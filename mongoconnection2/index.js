import express from "express"
import dbConnect from "./config/dbConfig.js"  //extension is compulsory(.js)
import userRouter from "./routes/userRoutes.js";



const app = express()

//connect db
dbConnect();


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//routes
app.get("/",(req,res)=>res.send({message:"Server at Work"}))

app.use("/user",userRouter)  //user Router


//listen
app.listen(4000, () => {
    console.log("app is running in http://localhost:4000")
})