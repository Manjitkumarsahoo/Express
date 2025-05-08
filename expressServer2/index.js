import express from "express"
//import path from "path"


const app = express()

//middleware
app.use(express.static("./public"))   //static folder middleware
app.use(express.json())                //json parser middleware

let storedData = []


app.get("/", (req, res, next) => {
    res.sendFile("D:/Express/expressServer2/public/pages/index.html")   //Absolute path
    //res.sendFile(path.join(__dirname,"public","pages","index.html"))       //Dynamic path    not support in ES6 modul
})

app.get("/about", (req, res, next) => {
    res.sendFile("D:/Express/expressServer2/public/pages/about.html")
})

app.get("/navbar.css",(req,res,next)=>{
    res.sendFile("D:/Express/expressServer2/public/css/navbar.css")
})

app.get("/getdata", (req, res) => {
    res.json(storedData);  // Return stored data
});

app.post("/postdata", (req, res) => {
    storedData = req.body;  // Save the array sent from frontend
    console.log("Data received:", storedData);
    res.json({ message: "Data received", data: storedData });
});

//routes (or) Apis




app.listen(4000, "127.0.0.7", () => {
    console.log("server started at http://127.0.0.7:4000")
})