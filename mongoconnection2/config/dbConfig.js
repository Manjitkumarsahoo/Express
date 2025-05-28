import mongoose from "mongoose";

let mongoURL = "mongodb://127.0.0.1:27017/App2"

async function dbConnect() {
    try {
        //db connection
        await mongoose.connect(mongoURL);
        console.log("Database Connection")
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;

