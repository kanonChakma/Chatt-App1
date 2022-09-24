import cors from "cors";
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config()

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
connectDB();


const port = process.env.PORT || 8086;
const server = app.listen(port, () => {
    console.log('listening on port ' + port)
})
