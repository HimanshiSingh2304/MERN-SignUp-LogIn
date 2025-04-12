import userSchema from "./Users/index.js";
import {model} from "mongoose"

export const Users = model ("User", userSchema)