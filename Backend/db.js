import mongoose from "mongoose";
import dotenv from "dotenv";


const connectDB = async () => {
    try {
        //  console.log(process.env.MONGO_URI)
        await mongoose.connect("mongodb+srv://lavneshy:2S6DPk0DNUeNpCku@cluster0.2j5no.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("mongoDB is connected");


    }
    catch (err) {
        console.log(err);

    }
}
export default connectDB;
