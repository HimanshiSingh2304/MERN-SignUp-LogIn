import express from 'express'
import authRouter from "./Auth/index.js"
import dashboardRouter from "./Dashboard/index.js"


const router = express.Router()
router.use("/auth",authRouter)
router.use("/user", dashboardRouter)


export default router