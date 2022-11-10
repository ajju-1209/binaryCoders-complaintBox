import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: "resident"
    }
},{
        timestamps: true
    
});

userSchema.virtual('userRoleInfo',{
    ref: 'Role',
    localField: 'userRole',
    foreignField: 'slug',
    justOne: true
});

userSchema.virtual('workerInfo',{
    ref: 'WorkerForm',
    localField: 'email',
    foreignField: 'email',
    justOne: true
})

const User = mongoose.model('User', userSchema)
export default User