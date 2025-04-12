import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();


export default mongoose.connect(process.env.URI).then(()=>{
    console.log("Connected to Database")
})
