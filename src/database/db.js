import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const url=process.env.MONGO_URL
mongoose.connect(url)
export default mongoose