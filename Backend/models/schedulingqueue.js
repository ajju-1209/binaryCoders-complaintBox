import mongoose from "mongoose";
import { QueueRecordsStatues } from "../Constants/Constants.js";

const schedulingQueueSchema = mongoose.Schema(
  {
    forCollection: {
      type: String,
      required: true,
    },
    complaintId: {
      type: mongoose.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: QueueRecordsStatues.unprocessed,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const SchedulingQueue = mongoose.model(
  "SchedulingQueue",
  schedulingQueueSchema
);
export default SchedulingQueue;
