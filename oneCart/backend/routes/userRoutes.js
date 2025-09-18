import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getCurrentUser ,getAdmin} from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
let userRoutes=express.Router()


userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
userRoutes.get("/getadmin", adminAuth, getAdmin);


export default userRoutes
