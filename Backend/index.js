import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import connectDB from "./mongodb/connect.js";
import AIImageRepo from "./routes/AIImageRepo.js";
import authRoutes from "./routes/authRoutes.js";
import conversation from "./routes/conversation.js";
import { ConnectSocketIO } from "./controllers/Chat/config.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const server = app.listen(8080, () =>
      console.log("server started on PORT :- 8080")
    );
    const io = new Server(server, {
      cors: "*",
    });

    // Connect Socket.io
    ConnectSocketIO(io);
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/v1/ai-image-repo", authRoutes);
app.use("/api/v1/ai-image-repo", AIImageRepo);
app.use("/api/v1/ai-image-repo", conversation);

startServer();
