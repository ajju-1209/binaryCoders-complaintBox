import { Status } from "../Constants/Constants.js";
import Complaint from "../models/complaintModel.js";
import User from "../models/userModel.js";

const assignComplaint = async (forUserRole) => {
  const users = await User.find({ userRole: forUserRole })
    .select("email")
    .lean();
  const complaintCount = await Complaint.count({
    status: Status.solved,
  }).lean();
  if (users.length) {
    const userToAssignComplaint = users[complaintCount % users.length];
    return userToAssignComplaint.email;
  }
  return "";
};

export default assignComplaint;
