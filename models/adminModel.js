const mongoose = require('mongoose');

const multer = require('multer');
const { type } = require('os');

const path = require('path');

const imagePath = "uploads/adminImages";

const adminStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename : (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Admin', 'User'],
        default: 'User'
    },
    avtar: {      
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpire: {
        type: Date,
        default: null
    }
});

AdminSchema.statics.uploadAdminImage = multer({
    storage: adminStorage
}).single('avtar');

AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;