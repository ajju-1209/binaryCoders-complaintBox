import { CronJob } from "cron";
import {
  QueueCollections,
  QueueRecordsStatues,
} from "../Constants/Constants.js";
import SchedulingQueue from "../models/schedulingqueue.js";
import sendEmail from "../utils/emailSender.js";

const sendEmailOnStatusChange = async () => {
  try {
    console.log("Send Email Worker has stated");
    const BATCH_SIZE = 5000;
    let batch = 0;
    const query = {
      forCollection: QueueCollections.statusChangesSendEmail,
      status: QueueRecordsStatues.unprocessed,
    };
    while (true) {
      const records = await SchedulingQueue.find(query)
        .populate([{ path: "complaintId" }])
        .skip(batch * BATCH_SIZE)
        .limit(BATCH_SIZE)
        .lean();
      const queueBulkUpdateQuery = [];
      for (const record of records) {
        try {
          await sendEmail();
          queueBulkUpdateQuery.push({
            updateOne: {
              filter: {
                _id: record._id,
              },
              update: {
                status: QueueRecordsStatues.processed,
              },
              upsert: false,
            },
          });
        } catch (err) {
          queueBulkUpdateQuery.push({
            updateOne: {
              filter: {
                _id: record._id,
              },
              update: {
                status: QueueRecordsStatues.processed,
                message: err,
              },
              upsert: false,
            },
          });
        }
      }
      await SchedulingQueue.bulkWrite(queueBulkUpdateQuery);

      // break the loop if records are less than the batch size means less records are present
      if (records.length < BATCH_SIZE) {
        break;
      } else {
        batch += 1;
      }
    }
    console.log("Send Email Worker ended");
  } catch (err) {
    console.log("ERRRRRRRRRRRR", err);
  }
};

export const sendEmailOnStatusChangeWorker = new CronJob({
  cronTime: "1 * * * * *",
  onTick: async () => {
    sendEmailOnStatusChangeWorker.stop();
    await sendEmailOnStatusChange();
    // resuming worker after previous records have been processed
    sendEmailOnStatusChangeWorker.start();
  },
  timeZone: "Asia/Calcutta",
});
