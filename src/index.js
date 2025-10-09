// require("dotenv").config(path:'./.env');
import dotenv from "dotenv"
import {app} from "./app.js"

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import express from "express"; 

import connectDB from "./db/index.js"

dotenv.config({path: './.env'})



connectDB();


 app.listen(process.env.PORT,()=>{
            console.log(`app is  listening on port ${process.env.PORT}`);
        })



// const app=express();
// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.error("Server Error");
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is  listening on port ${process.env,PORT}`);
//         })
//     }
//     catch(error){
//         console.error(error);
//     }
// })()