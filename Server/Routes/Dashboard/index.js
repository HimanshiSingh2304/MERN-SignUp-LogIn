import express from 'express'
import authmiddleware from '../../Middleware/authmiddleware.js'
import { getDashboardData } from '../../Controllers/DashboardController.js';



const router=express.Router();

router.get('/dashboard', authmiddleware, getDashboardData);
  
  

export default router