import express, { Router } from 'express'

const app = express()

//MIDDLEWARE
//Application level middlewarw//
app.get("/", (req, res, next) => {
    console.log("middleware 1")
    //throw new Error ("This is Error")
    next()
}, (req, res, next) => {
    console.log("middleware 2")
    res.write("Hey There")
    next()
}, (req, res, next) => {
    console.log("middleware 3")
    res.end("Hello")
})


//Routing level middleware

//router declaration
const userRouter = Router()
const productRouter = Router()

//router middleware
app.use("/user", userRouter)
app.use("/products", productRouter)

//apis
userRouter.get("/login", (req, res) => {
    console.log("user login route")
    res.end("Login Page")
})
productRouter.get("/add", (req, res) => {
    console.log("add products route")
    res.end("Add Product")
})


//Error Handling Middleware       (Error handling middleware can be lowest part of all middlewwre)

app.use((error, req, res, next) => {
    console.log("error : ", error.message)
})

//Built-in Middleware
app.use(express.static("./folderpath"))              //static folder to serve static files
app.use(express.json())                             //parse the incoming json dta in request body
app.use(express.urlencoded({ extended: true }))     //parse the incoming url data in request data


//Third Part Middleware
//app.use(morgan("dev"))                  //api request logger
//app.use(cookie-parser())                  //parse cookie data
//app.use(cors())                           //resolve the cross origin resource sharing policy
//app.use(multer())                         //handle form-data(filter) in request body

app.listen(4000, "127.0.0.7", () => {
    console.log("Server started in http://127.0.0.7:4000")
})