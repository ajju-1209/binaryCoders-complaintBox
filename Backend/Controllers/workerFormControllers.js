import expressAsyncHandler from "express-async-handler";
import {workerStatus} from '../Constants/Constants.js'
import WorkerForm from "../models/workerFormModel.js";


//@desc record a new form for worker
//@route /api/workerData/record
//@access PROTECTED
const recordData = expressAsyncHandler(async(req,res) => {
    const email = req.user.email
    const {profession,experience,referralID} = req.body

    if(!(email && profession && experience && referralID)) 
    res.status(400).send("All inputs are required !!");
    else {
        const dataExists = await WorkerForm.findOne({ email })
        if(dataExists)
            res.status(400).send({
                message: "Data Already Exists"
            });
        else{
            const data = await WorkerForm.create({
                email,
                profession,
                experience,
                referralID,
                status : workerStatus.pending
            })

            if(data)
                res.status(200).send(data)
        }
    }
})

//@desc get records from db 
//@route /api/workerData/getRecords
//@access ADMIN
const getRecords = expressAsyncHandler(async(req,res) => {
    const query = {status: req.query.status}
    // if(Array.isArray(req.query.status)){
    //     query.status = {$in:req.query.status}
    // }else if(req.query.status) {
    //     query.workerStatus = {$in:[req.query.status]}
    // }
    const data = await WorkerForm.find(query).populate([{path:"referralPersonInfo", select:"firstName phoneNumber address"},{path:"formFilledByPersonInfo", select:"firstName phoneNumber address"}])

    let Records = []
    for( let r of data) {
        let info  = {}
        info.id = r.id
        info.email = r.email
        info.formFilledByPersonInfo = r.formFilledByPersonInfo
        info.profession = r.profession
        info.referralID = r.referralID
        info.referralPersonInfo = r.referralPersonInfo
        info.experience = r.experience
        Records.push(info)
    }
    res.status(200).send(Records)
})

const updateStatus = expressAsyncHandler(async(req,res) => {
    const record =await WorkerForm.findById(req.body.id)
    if(record) {
        record.status = req.body.status
        record.save()
        res.status(200).send({
            message: "Status Updated",
            status: record.status
        })
    }else{
        res.status(400).send("No Record Found!")
    }
})
export {recordData,getRecords,updateStatus}