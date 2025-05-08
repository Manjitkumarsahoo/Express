import express from "express"
import fs, { readFileSync } from "fs"

const server = express();

// //Server logic Write here
// server.get("/",(req,res)=>{
//     // console.log("hello");
//     // res.write("Hello World");
//     // res.write("<h1>Welcome to Express</h1>")
//     res.end(fs.readFileSync("./pages/Home.html"));
// })

// server.get("/login",(req,res)=>{
//     //res.end("Welcome to login page")
//     res.end(fs.readFileSync("./pages/Login.html"))
// })

// server.get("/Home.css",(req,res)=>{
//     res.end(fs.readFileSync("./css/Home.css"))
// })

// server.get("/wallpaper",(req,res)=>{
//     res.end(fs.readFileSync("./assets/Wallpaper.jpg"))
// })

//Static folder middleware
server.use(express.static("./public"))


//Apis
server.get("/",(req,res)=>{
    res.end(readFileSync("./public/pages/Home.html"))
})

server.listen(4000,"127.0.0.7",()=>{
    console.log("Server is run at http://127.0.0.7:4000")
})