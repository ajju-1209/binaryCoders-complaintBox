import { createQueueRecord } from "../Controllers/schedulingQueueControllers.js";
import express from "express";
const router = express.Router();

router.post("/", createQueueRecord);

export default router;
