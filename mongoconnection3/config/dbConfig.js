import mongoose from "mongoose";

const dbURl= "mongodb://127.0.0.1:27017/App3"

async function dbConnection(){
    try {
        await mongoose.connect(dbURl);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;