import expressAsyncHandler from "express-async-handler";
import Announcement from "../models/announcementModel.js";
import mongoose from "mongoose";

//@desc create a new announcement
//@route /api/announcement/create
//@access Admin
const createAnnouncement = expressAsyncHandler(async (req, res) => {
    const announcement = await Announcement.create({
        madeBy: req.user.email,
        description: req.body.description
    })
    if (announcement) {
        res.json({
            madeBy: announcement.madeBy,
            description: announcement.description,
            date: announcement.date
        })
    } else {
        res.status(401)
        throw new Error('Invalid Data')
    }
})

//@desc delete a announcement
//@route /api/announcement/delete
//@access Admin
const deleteAnnouncement = expressAsyncHandler(async (req, res) => {
    try {
        await Announcement.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
        res.status(201).json({
            message: 'Announcement Deleted'
        })
    } catch (e) {
        res.status(401)
        throw new Error('Announcement not Found')
    }
})

//@desc update a announcement
//@route /api/announcement/update
//@access Admin
const updateAnnouncement = expressAsyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.body.id)
    if (announcement) {
        announcement.description = req.body.description
        await announcement.save()
        res.json({
            message: 'Description Updated'
        })
    } else {
        res.status(401)
        throw new Error('Announcement not Found')
    }
})

//@desc get all announcements sorted by date asc
//@route /api/announcement/getAll
//@access Protected
const getAll = expressAsyncHandler(async (req, res) => {
    const announcements = await Announcement.find({}).sort({ date: -1 })

    res.json(announcements)
})

export { createAnnouncement, deleteAnnouncement, updateAnnouncement, getAll }