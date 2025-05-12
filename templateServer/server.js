import express from "express"
//import ejs from "ejs"


const app = express()

//define template engine
app.set("view engine", "ejs")            //by default folder name is views

app.set("views", "pages")               //if we change the folder name (declaration)

//routes
app.get("/", (req, res) => {
    res.render("Home.ejs", { name: "Manjit", age: 25, address: "Odisha" })           //.ejs is optional   ,Here we can also send data to client
})

app.get("/about", (req, res) => {
    res.render("About", { numbers: [1, 2, 3, 4, 5] });
});



app.listen(4000, "127.0.0.7", () => {
    console.log("Server is run at http://127.0.0.7:4000")
})