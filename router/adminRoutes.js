const express = require('express');

const route = express.Router();

const AdminCtl = require('../controllers/adminController');

const Admin = require('../models/adminModel');

const passport = require('passport');

const roleAuth = require('../middleware/roleAuth');

route.get('/',AdminCtl.loginpage);

route.post('/checkLogin', passport.authenticate('local', { failureRedirect: '/' }), AdminCtl.checkLogin);

route.get('/logout',passport.setAuthenticated,AdminCtl.logout);

route.get('/register', AdminCtl.registerPage);

route.post('/register-admin', Admin.uploadAdminImage, AdminCtl.registerAdmin);

route.get('/profile',passport.setAuthenticated,AdminCtl.profilePage);

route.get('/dashboard',passport.setAuthenticated,AdminCtl.dashboard);

route.get('/add-admin',passport.setAuthenticated,roleAuth.checkRole('Super Admin'),AdminCtl.addAdmin);

route.get('/view-admin',passport.setAuthenticated,AdminCtl.viewAdmin);

route.get('/delete-admin/:id', passport.setAuthenticated, roleAuth.checkRole('Super Admin'), AdminCtl.deleteAdmin);

route.get("/update-admin/:id",passport.setAuthenticated,roleAuth.checkRole('Super Admin', 'Admin'),AdminCtl.updateAdmin);

route.post('/insertAdminData',passport.setAuthenticated,roleAuth.checkRole('Super Admin'),Admin.uploadAdminImage,AdminCtl.insertAdminData);

route.post("/editAdminData/:id",passport.setAuthenticated, roleAuth.checkRole('Super Admin'),Admin.uploadAdminImage, AdminCtl.editAdminData);

route.get('/trash-admin', passport.setAuthenticated, AdminCtl.trashAdmins);

route.get('/trash-admin/:id',passport.setAuthenticated,roleAuth.checkRole('Super Admin'),AdminCtl.deleteAdmin);

route.get('/restore-admin/:id', passport.setAuthenticated, AdminCtl.restoreAdmin);

route.get('/permanent-delete/:id', passport.setAuthenticated, AdminCtl.permanentDelete);

route.get('/forgot-password', AdminCtl.forgotPasswordPage);

route.post('/send-otp', AdminCtl.sendOtp);

route.get('/verify-otp', AdminCtl.verifyOtpPage);

route.post('/verify-otp', AdminCtl.verifyOtp);

route.get('/reset-password', AdminCtl.resetPasswordPage);

route.post('/reset-password', AdminCtl.resetPassword);

module.exports = route;