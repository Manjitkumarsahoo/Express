import express from "express"
import fs from "fs"

const app = express()

//middleware
app.use(express.json())



//routes
app.get("/", (req, res) => {
    res.send("server is working")
})

app.get("/user", (req, res) => {
    res.send({ name: "Manjit", age: 25, address: "BBSR" })
})

app.post("/register", (req, res) => {
    console.log(req.body)
    res.status(202).send({ message: "Data Stored" })
})

app.post("/add", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync("./index.json"))
    const newtask = { id: Date.now(),...req.body }
    tasks.push(newtask)
    fs.writeFileSync("./index.json", JSON.stringify(tasks));
    res.send(JSON.stringify(newtask))
})



    








app.listen(4000, "127.0.0.7", (req, res) => {
    console.log("Server run at http://127.0.0.7:4000")
})