import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

let saltRound = 10;        //how many encrypt we want in password 
let secreteKey ="Manjit123"

export async function createUser(req, res) {
    try {
        let data = req.body
        if (data.email && data.password && data.name) {       //check if email,password and name all are present or not
            const isEmail = await userModel.findOne({ email: data.email })   //find the mail 
            if (isEmail) {
                return res.status(400).send({ error: "Email alredy exist" })
            } else {
                //hash the password 
                let hashedpassword = bcrypt.hashSync(data.password,saltRound)
                //save logic
                const user = new userModel({...data,password:hashedpassword});  //create the instance
                await user.save();                 //save the data in DB
                return res.status(201).send({ message: "User created in DB" });
            }
        } else {
            return res.status(400).send({ error: "Provide all the required Field" })
        }

    } catch (error) {
        return res.status(400).send({ error: "Something went wrong", msg: error.message })
    }
}

export async function allUser(req, res) {
    //get all user from db
    try {
        //only display the name email gender
        //const users = await userModel.find({}, { name: 1, email: 1, gender: 1 })  //mongodb query   
        //const users = await userModel.find({}, { password: 0, _id: 0 ,__v:0})
        //const users = await userModel.find({}).select("name email gender -_id")     //mongoose query
        const users = await userModel.find({}).select("-password -_id -__v")
        res.status(200).send(users);
    } catch (error) {
        return res.status(400).send({ error: "Something went wrong", msg: error.message })
    }
}


export async function userLogin(req, res) {
    try {
        let { email, password } = req.body      //recive the email and password providr by us
        if (email && password) {                 //check if they are valid or not
            const user = await userModel.findOne({ email });   //find the user based on email
            if (user) {
                let isMatched = bcrypt.compareSync(password,user.password)
                if (isMatched) {              //check the user password and password provide by us 
                    //jwt create 
                    const token = jwt.sign({id: user.id},secreteKey,{expiresIn:300})   //directly pass after message
                    res.set("token",token)    //pass the token on Header
                    //res.cookie("token",token)   //pass the token on Cookies
                    return res.status(200).send({ message: "Login successful"})
                } else {
                    return res.status(400).send({ error: "Invalid Password" })
                }
            } else {
                return res.status(400).send({ error: "User not found" });
            }
        } else {
            return res.status(400).send({ error: "Provide all the required Field" })
        }
    } catch (error) {
        return res.status(400).send({ error: "Something went wrong", msg: error.message })
    }
}


export async function userUpdate(req, res) {
    try {
        // const { id } = req.params;                  //recive the id which we can provide in url 
        const{token} = req.headers
        //varify the token
        const {id} = jwt.verify(token,secreteKey);      //verify the token with id bcz we create token by using id 
        let isUser = await userModel.findById(id);  //find the user base on id
        if (isUser) {
            let data = req.body;
            await userModel.updateOne({ email: isUser.email }, { $set: { ...data } });  //updatr the user based on data
            return res.status(200).send({ message: "User data Updated" })
        } else {
            res.status(400).send({ error: "Invalid user" });
        }
    } catch (error) {
        return res.status(400).send({ error: "Something went wrong", msg: error.message })
    }
}


export async function deleteUser(req, res) {
    try {
        //console.log(req.query);
        const { id } = req.query;                      //recive the user id from the query provide on url
        let isUser = await userModel.findById(id);     //find the user based on id
        if (isUser) {
            await userModel.deleteOne({email:isUser.email});        //delete the user based on email or id 
            return res.status(200).send({message:"User Deleted"})
        } else {
            res.status(400).send({ error: "Invalid user" });
        }
    } catch (error) {
        return res.status(400).send({ error: "Something went wrong", msg: error.message })
    }
}