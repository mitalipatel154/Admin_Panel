const express = require('express');
const route = express.Router();

const passport = require('passport');
const roleAuth = require('../middleware/roleAuth');

const CategoryCtl = require('../controllers/categoryController');

route.get('/add-category',passport.setAuthenticated,roleAuth.checkRole('Super Admin','Admin'),CategoryCtl.addCategoryPage);

route.post('/insert-category',passport.setAuthenticated,roleAuth.checkRole('Super Admin','Admin'),CategoryCtl.insertCategory);

route.get('/view-category', passport.setAuthenticated, CategoryCtl.viewCategory);

route.get('/edit-category/:id', passport.setAuthenticated, CategoryCtl.editCategoryPage);

route.post('/update-category/:id', passport.setAuthenticated, CategoryCtl.updateCategory);

route.get('/delete-category/:id', passport.setAuthenticated, CategoryCtl.deleteCategory);

route.get('/change-category-status/:id', passport.setAuthenticated, CategoryCtl.changeCategoryStatus);

route.get('/trash-category', passport.setAuthenticated, CategoryCtl.trashCategory);

route.get('/restore-category/:id', passport.setAuthenticated, CategoryCtl.restoreCategory);

route.get( '/permanent-delete-category/:id', passport.setAuthenticated, CategoryCtl.permanentDeleteCategory);

module.exports = route;