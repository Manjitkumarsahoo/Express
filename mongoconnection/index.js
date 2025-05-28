import express from "express"
import mongoose from "mongoose"

const app = express()


//middlewares
app.use(express.json())


//apis


//db configuration
mongoose.connect('mongodb://127.0.0.1:27017/App1')
.then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error.message);
})

//declaring a collection
//schema
let userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number},
    address:{
        city:String,
        zip:Number,
        country:String
    }
})

//model

let userModel = mongoose.model("Users",userSchema)

//api
//create users
app.post("/create", async (req, res) => {
  try {
    let data = req.body;
    let response = await userModel.insertOne(data);
    res.send(response);
  } catch (error) {
    console.log(error);
  } 
});



app.listen(4000,()=>{
    console.log("app is running in http://localhost:4000")
})