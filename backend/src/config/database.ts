import mongoose from "mongoose";
import { env } from "./env.js";

async function connectToDb() {
    try {
      await mongoose.connect(env.MONGOOSE_URI)
      console.log(`Connect to database!`)     
    } catch (error) {
      console.log(error)
    }
}

export default connectToDb