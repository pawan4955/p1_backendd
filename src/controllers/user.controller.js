import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from " ../utils/ApiError.js";
import {User} from '../models/user.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';



const registerUser=asyncHandler(async(req,res)=>{
   //get user data from frontend
   //validation
   //check if user already exists
   //check for images,avatar
   //upload them to cloudinary
   //create user object
   //remove password from responnse
   //chexk for user creation 
   // return response

   const {fullname ,email,username,password}=req.body;
   console.log("email :",email);

   if([
    fullname==="" || email==="" || username==="" || password===""
   ].includes(true)){
    throw new ApiError(400,"All fields are required");
   }

  const existUser= User.findOne({
    $or:[{username},{email}]
   })

   if(exitsUser){
    throw new ApiError(409,"User already exists with this email or username");  
   }

   const avatarLocalPath=req.files?.avatar[0]?.path
   const coverImageLocalPath=req.files?.coverimage[0]?.path

   if(!avatarLocalPath){
     throw new ApiError(400,"Avatar is required");
   }

   const avatar=await uploadToCloudinary(avatarLocalPath);
    const coverimage=await uploadToCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(500,"Failed to upload avatar image");
    }

    const user =await User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    
    const createdUser =await User.findById(user._id).select(
        "-password -refreshToken "
    )

    if(!createdUser){
        throw new ApiError(500,"User creation failed");
    }

      return res.status(201).json(new ApiResponse(201,"User created successfully",createdUser));

   

})

export {registerUser};