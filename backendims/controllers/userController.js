import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
const resisterUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    //validation 
    if(!name | !email | !password){
        res.status(400);
        throw new Error("Please fill in all required field");
    }
        //check if user already exists..
        const userExists=await User.findOne({email});
        if(userExists){
            res.status(400)
            throw new Error("Email id already been registered");
        }
        //create new user
        const newUser=await User.create({name,email,password});
        if(newUser){
            const {_id,name,email,password,photo,phone,bio}=newUser;
            res.status(201).json({
                _id,name,email,password,photo,phone,bio
            })
        }else {
            res.status(400)
            throw new Error("User registration failed");
        }       
})

export {resisterUser}