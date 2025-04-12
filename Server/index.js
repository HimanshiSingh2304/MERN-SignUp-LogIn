import express from "express";
import dbconnection from "./Connection/dbconnection.js";
import dotenv from "dotenv"
import cors from "cors"
import router from "./Routes/index.js"

dotenv.config();
const app= express()
app.use(cors({
    origin: "https://mern-signup-login-frontend.onrender.com",
    credentials:true
}))
app.use(express.json())
dbconnection;
app.use("/api",router)
//creating port
app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`);
});
