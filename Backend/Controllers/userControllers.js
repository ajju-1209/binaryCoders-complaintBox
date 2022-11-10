import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import sendEmail from "../utils/emailSender.js";

//@desc Register a new User
//@route /api/users/register
//@access PUBLIC
const registerUser = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, password } =
    req.body;
  //validate user input
  if (!(firstName && lastName && email && phoneNumber && address && password))
    res.status(400).send("All inputs are required !!");
  else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(404);
      throw new Error("User already Exists!!");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password: encryptedPassword,
    });
    if (user) {
      res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        token: generateToken(user.email),
        userRole: user.userRole,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});

//@desc Login User
//@route /api/users/login
//@access PUBLIC
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400);
    throw new Error("All inputs are required");
  } else {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        userRole: user.userRole,
        token: generateToken(user.email),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email and Password");
    }
  }
});

//@desc get user Profile
//@route /api/users/:id
//@access PROTECTED
const getProfile = expressAsyncHandler( async(req,res) => {
    
    const user = await User.findOne({_id:new mongoose.Types.ObjectId(req.params.id)}).populate([{path:"userRoleInfo", select:"name slug"}])
    
    if(user) {
        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            userRole: user.userRole,
            userRoleInfo: user.userRoleInfo
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})

//@desc get users
//@route /api/users/admin/getUsers
//@access ADMIN
const getUsers = expressAsyncHandler( async(req,res) => {
    const query = {}
    if(Array.isArray(req.query.excludedRoles)){
        query.userRole = {$nin:req.query.excludedRoles}
    }else if(req.query.excludedRoles) {
        query.userRole = {$nin:[req.query.excludedRoles]}
    }
    try{
        const users = await User.find(query).populate([{path:"workerInfo", select:"experience"}])
        const usersInfo = []
        for(let user of users) {
            let info = {}
            info.firstName= user.firstName,
            info.lastName= user.lastName,
            info.email= user.email,
            info.phoneNumber= user.phoneNumber,
            info.address= user.address,
            info.userRole= user.userRole,
            info.workerInfo= user.workerInfo
            usersInfo.push(info)
        }
        res.json(usersInfo)
    }catch(error){
        console.log(error)
    }
})

//@desc Update user profile
//@route /api/users/updateProfile

const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (user) {
    user.address = req.body.address || user.address;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
      password: updatedUser.password,
      userRole: updatedUser.userRole,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user role
//@route /api/users/updateUserRole
const updateUserRole = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.userRole = req.body.userRole || user.userRole;

    const updatedUser = await user.save();
    res.json({
      email: updatedUser.email,
      userRole: updatedUser.userRole,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  authUser,
  getProfile,
  getUsers,
  updateProfile,
  updateUserRole,
};
