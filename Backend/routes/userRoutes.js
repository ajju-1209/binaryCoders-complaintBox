import express from "express";
import { registerUser, authUser, getProfile, getUsers, updateProfile,updateUserRole} from "../Controllers/userControllers.js";
import {protect,admin} from '../Middleware/authMiddleware.js'
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/admin/getUsers', protect,admin,getUsers)
router.get('/:id', protect,getProfile)
router.patch('/updateProfile',protect, updateProfile)
router.patch('/updateUserRole',protect,admin,updateUserRole)

export default router