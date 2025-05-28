import express, { urlencoded } from "express"
import dbConnection from "./config/dbConfig.js"
import userModel from "./model/userModel.js";

const app = express()

dbConnection();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/add", async (req, res) => {
    const data = req.body;
    const response = await userModel.insertOne(data);
    res.send(response);
})

app.listen(4000, "127.0.0.7", () => {
    console.log("server start on http://127.0.0.7:4000")
})