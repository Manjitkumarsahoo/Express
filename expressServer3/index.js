import express from "express"
import fs from "fs"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("D:/Express/expressServer3/pages/index.html")
})

app.get("/navbar.css", (req, res) => {
    res.sendFile("D:/Express/expressServer3/css/navbar.css")
})
app.get("/page2.css", (req, res) => {
    res.sendFile("D:/Express/expressServer3/css/page2.css")
})
app.get("/page1.css", (req, res) => {
    res.sendFile("D:/Express/expressServer3/css/page1.css")
})
app.get("/index.css", (req, res) => {
    res.sendFile("D:/Express/expressServer3/css/index.css")
})
app.get("/task", (req, res) => {
    res.sendFile("D:/Express/expressServer3/pages/page1.html")
})
app.get("/addtask", (req, res) => {
    res.sendFile("D:/Express/expressServer3/pages/page2.html")
})
app.get("/alltask", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./data/todo.json", "utf-8"))
    res.end(JSON.stringify(data));
})
app.get("/task/:id", (req, res) => {                                         
    const taskid = parseInt(req.params.id);                                       //recive the task id by using params 
    const tasks = JSON.parse(fs.readFileSync("./data/todo.json", "utf-8"))         //take the tasks from todo.json
    const task = tasks.find(t => t.id === taskid)                                  //find the task by unsinfg id
    res.send(JSON.stringify(task))                                                 //send the tsk to front end
})

app.post("/add", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync("./data/todo.json"))
    const newtask = { id: Date.now(), ...req.body }
    tasks.push(newtask)
    fs.writeFileSync("./data/todo.json", JSON.stringify(tasks));
    res.end(JSON.stringify(newtask))
})

app.delete("/deletetask", (req, res) => {
    const { id } = req.body                                                      //Destructure the id from req.body
    if (id) {
        const tasks = JSON.parse(fs.readFileSync("./data/todo.json", "utf-8"))    //take the task from todo.json
        const filtertasks = tasks.filter(task => task.id != id)                    //filter that task except the provid id
        fs.writeFileSync("./data/todo.json", JSON.stringify(filtertasks))          //ReWrite the file with updated data
        res.status(200).send(filtertasks)
    } else {
        res.status(400).send({ error: "Provide the id" })
    }
})

app.put("/updatetask", (req, res) => {
    const updatedTask = req.body                                                //recive the updaed task from froentend
    const tasks = JSON.parse(fs.readFileSync("./data/todo.json", "utf-8"))      //take the task from todo.json
    const index = tasks.findIndex(task => task.id === updatedTask.id)            //find the index of task by using id

    if (index !== -1) {
        tasks[index] = updatedTask;                                              //updated the task
        fs.writeFileSync("./data/todo.json", JSON.stringify(tasks))               //Rewrite file after updated
        res.status(200).send(tasks)
    } else {
        res.status(404).json({ error: "Task not found" });
    }
})



app.listen(4050, "localhost", () => {
    console.log("Server runs at http://localhost:4050")
})