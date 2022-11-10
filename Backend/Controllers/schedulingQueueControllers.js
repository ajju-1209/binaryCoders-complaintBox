import expressAsyncHandler from "express-async-handler";
import {
  QueueCollections,
  QueueRecordsStatues,
} from "../Constants/Constants.js";
import SchedulingQueue from "../models/schedulingqueue.js";

//@desc create a new queue record
//@route /api/queue
//@access Protected
const createQueueRecord = expressAsyncHandler(async (req, res) => {
  const queueRecord = await SchedulingQueue.create({
    forCollection: QueueCollections.statusChangesSendEmail,
    complaintId: req.body.complaintId,
    status: QueueRecordsStatues.unprocessed,
  });
  if (queueRecord) {
    res.json({
      forCollection: QueueCollections.statusChangesSendEmail,
      complaintId: queueRecord.complaintId,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Data");
  }
});

export { createQueueRecord };
