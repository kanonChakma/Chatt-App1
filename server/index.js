import cors from "cors";
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config()

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);
connectDB();

//error handleing
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 8086;
const server = app.listen(port, () => {
    console.log('listening on port ' + port)
})
