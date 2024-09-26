import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './db.js';
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js";
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5171',
    credentials: true // Fix the typo
}
app.use(cors(corsOptions));

const PORT = 3000;

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/project", projectRoutes);
connectDB();



app.listen(PORT, () => {

    console.log("server runing");
})