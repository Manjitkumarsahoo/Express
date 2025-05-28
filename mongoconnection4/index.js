import express from "express"
import dbConnect from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import prodRouter from "./routes/prodRouter.js";

const app = express();

//db connection
dbConnect();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// app.use("/",userRouter);
app.use("/prod",prodRouter);
app.use("/users",userRouter);




app.listen(4000,() => {
    console.log("server run at http://localhost:4000")
})