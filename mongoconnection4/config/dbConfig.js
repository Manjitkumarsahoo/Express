import mongoose from "mongoose";

const URL = "mongodb://127.0.0.1:27017/App4"

async function dbConnect() {
    try {
        await mongoose.connect(URL);
        console.log("DB Connected")
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;
