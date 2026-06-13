const Admin = require('../models/adminModel');
const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const transporter = require('../config/mailer');
const { log } = require('console');

module.exports.loginpage = (req, res) => {
    try{

        if(req.isAuthenticated()){
            return res.redirect('/dashboard');
        }

        return res.render('login');

    }catch(err){
        console.log(err);
    }
};

module.exports.checkLogin = async (req, res) => {
    try {

        return res.redirect('/dashboard');

    } catch (err) {

        console.log(err);

        return res.render('login');
    }   
};

module.exports.logout = async (req,res) => {
    try{
        req.session.destroy(function(err) {
            if(err){
                console.log(err);
                return false;
            }
            return res.redirect('/');
        })          
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

module.exports.registerPage = (req,res)=>{
    return res.render('register');
}

module.exports.registerAdmin = async (req,res)=>{
    try{
        let checkEmail = await Admin.findOne({
            email:req.body.email
        });

        if(checkEmail){
            req.flash( 'error', 'Email Already Exists' );
            return res.redirect('/register');
        }

        let hashPassword = await bcrypt.hash( req.body.password, 10);

        let fullName = req.body.fname + " " + req.body.lname;
        await Admin.create({
            name:fullName,
            email:req.body.email,
            password:hashPassword,
            gender:req.body.gender,
            role:'User',
            avtar:req.file
                ? req.file.filename
                : ''
        });
        req.flash(
            'success',
            'Registration Successful'
        );
        return res.redirect('/');
    }catch(err){
        console.log(err);
        req.flash(
            'error',
            'Registration Failed'
        );
        return res.redirect('/register');
    }
}

module.exports.profilePage = async (req, res) => {
    try {
        let adminData = await Admin.findById(req.user._id);

        return res.render('profile', {
            adminData
        });

    } catch (err) {

        console.log(err);
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req, res) => {
    try {
        const adminData = req.user;
        return res.render('dashboard', { adminData });
    } catch (err) {
        console.error('dashboard error:', err);
        return res.redirect('/');
    }
};

module.exports.addAdmin = async (req, res) => {
    try {
        const adminData = req.user;
        return res.render('add-admin', { adminData });
    } catch (err) {
        console.error('addAdmin error:', err);
        return res.redirect('/');
    }
};

module.exports.insertAdminData = async (req, res) => {
    try {
        req.body.name = req.body.fname + " " + req.body.lname;

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        req.body.password = hashedPassword;

        req.body.avtar = '';

        if (req.file) {
            req.body.avtar = req.file.filename;
        }

        let adminRecord = await Admin.create(req.body);

        if (adminRecord) {
            req.flash('success', 'Admin Record Inserted Successfully');
            return res.redirect('/view-admin');
        } else {
            req.flash('error', 'Failed to Insert Admin Record');
            return res.redirect('/add-admin');
        }

    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('/add-admin');
    }
};

module.exports.viewAdmin = async (req, res) => {
    try {
        const adminData = await Admin.find({
            isDeleted: false
        });
        console.log(adminData);
        return res.render('view-admin', { 
            adminData 
        });
    } catch (err) {
        console.error('viewAdmin error:', err);
        return res.render('view-admin', { adminData: [] });
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {

        await Admin.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        });

        req.flash('success', 'Admin moved to Trash');
        return res.redirect('/view-admin');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Unable to move Admin to Trash');
        return res.redirect('/view-admin');
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        const adminRecord = await Admin.findById(req.params.id);
        if (!adminRecord) return res.redirect('/view-admin');

        const adminData = req.user;
        return res.render('edit-admin', { adminData, adminRecord });
    } catch (err) {
        console.error('updateAdmin error:', err);
        return res.redirect('/view-admin');
    }
};

module.exports.editAdminData = async (req, res) => {
    try {
        const adminId = req.params.id;
        const { name, email, gender, password } = req.body;

        const updateData = { name, email, gender };

        if (req.file) {
            updateData.avtar = req.file.filename;
        }
        if (password && password.trim() !== '') {
            updateData.password = await bcrypt.hash(
                password,
                10
            );
        }

        await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
        req.flash('success', 'Admin Updated Successfully');
        return res.redirect('/view-admin');

    } catch (err) {
        req.flash('error', 'Unable to Update Admin');
        return res.redirect('/view-admin');
    }
};

module.exports.trashAdmins = async (req, res) => {

    const trashData = await Admin.find({
        isDeleted: true
    });

    return res.render("trash-admin", {
        trashData
    });
}

module.exports.restoreAdmin = async (req, res) => {

    await Admin.findByIdAndUpdate(req.params.id, {
        isDeleted: false
    });

    req.flash("success", "Admin restored successfully");

    return res.redirect("/trash-admin");
}

module.exports.permanentDelete = async (req, res) => {

    await Admin.findByIdAndDelete(req.params.id);

    req.flash("success", "Admin permanently deleted");

    return res.redirect("/trash-admin");
}

module.exports.forgotPasswordPage = (req,res)=>{
    return res.render('forgot-password');
}

module.exports.sendOtp = async (req, res) => {

    try {

        let checkmail = await Admin.findOne({
            email: req.body.email
        });

        if (!checkmail) {
            req.flash('error', 'Email Not Found..!');
            return res.redirect('/forgot-password');
        }

        let otp = Math.floor(100000 + Math.random() * 900000);

        req.session.otp = otp;
        req.session.email = req.body.email;
        req.session.otpExpire = Date.now() + 30000;

        await transporter.sendMail({
            from: 'mnp15024@gmail.com',
            to: checkmail.email,
            subject: 'OTP Verification',
            html: `<h2>Your OTP is ${otp}</h2>`
        });

        req.flash('success', 'OTP sent successfully');
        return res.redirect('/verify-otp');

    } catch (err) {

        console.log(err);
        req.flash('error', 'Unable to send OTP');
        return res.redirect('/forgot-password');

    }
}

module.exports.verifyOtpPage = async (req,res)=>{
    return res.render('verify-otp');
}

module.exports.verifyOtp = async (req,res)=>{

    try{

        if(!req.session.otp){
            req.flash('error','OTP Not Found');
            return res.redirect('/forgot-password');
        }

        if(Date.now() > req.session.otpExpire){
            req.flash('error','OTP Expired');
            return res.redirect('/forgot-password');
        }

        if(req.body.otp != req.session.otp){
            req.flash('error','Invalid OTP');
            return res.redirect('/verify-otp');
        }
        req.session.otpVerified = true;
        req.flash('success','OTP Verified');
        return res.redirect('/reset-password');

    }
    catch(err){
        console.log(err);
        return res.redirect('/forgot-password');
    }

}

module.exports.resetPasswordPage = async (req,res)=>{
    if (!req.session.otpVerified) {
        req.flash('error','Please verify OTP first');
        return res.redirect('/forgot-password');
    }
    return res.render('reset-password');
}

module.exports.resetPassword = async (req,res)=>{

    try{
        if(req.body.password != req.body.confirmPassword){
            req.flash('error','Passwords Do Not Match');
            return res.redirect('/reset-password');
        }
        let hashPassword = await bcrypt.hash(
            req.body.password,
            10
        );
        await Admin.findOneAndUpdate(
            {
                email : req.session.email
            },
            {
                password : hashPassword
            }
        );

        req.session.otp = null;
        req.session.email = null;
        req.session.otpExpire = null;
        req.session.otpVerified = null;

        req.flash('success','Password Changed Successfully');

        return res.redirect('/');
    }
    catch(err){
        console.log(err);
        req.flash('error','Something Went Wrong');

        return res.redirect('/forgot-password');
    }

}