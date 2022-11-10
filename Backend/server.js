import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from 'path';
import connectDB from "./Config/db.js";
import { notFound, errorHandler } from "./Middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import userRoleRoutes from "./routes/userRoleRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import serviceRoutes from "./routes/servicesRoutes.js";
import announcementRoutes from "./routes/announcementRoute.js";
import workerFormRoutes from "./routes/workerFormRoutes.js";
import schedulingQueueRoutes from "./routes/schedulingqueueRoute.js";
import { sendEmailOnStatusChangeWorker } from "./Workers/emailSenderWorker.js";

import cors from "cors";
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/userRoles", userRoleRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/workerData", workerFormRoutes);
app.use("/api/queue", schedulingQueueRoutes);

sendEmailOnStatusChangeWorker.start();

const __dirname = path.resolve()
//for creating production ready react app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server runnning....".yellow.bold));
