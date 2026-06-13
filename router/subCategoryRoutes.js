const express = require('express');

const route = express.Router();

const passport = require('passport');

const SubCategoryCtl = require('../controllers/subCategoryController');

route.get( '/add-subcategory', passport.setAuthenticated, SubCategoryCtl.addSubCategoryPage);

route.post( '/insert-subcategory', passport.setAuthenticated, SubCategoryCtl.insertSubCategory);

route.get( '/view-subcategory', passport.setAuthenticated, SubCategoryCtl.viewSubCategory);

route.get('/edit-subcategory/:id', passport.setAuthenticated, SubCategoryCtl.editSubCategoryPage);

route.post('/update-subcategory/:id', passport.setAuthenticated, SubCategoryCtl.updateSubCategory);

route.get('/delete-subcategory/:id', passport.setAuthenticated, SubCategoryCtl.deleteSubCategory);

route.get('/change-subcategory-status/:id', passport.setAuthenticated, SubCategoryCtl.changeSubCategoryStatus);

route.get('/trash-subcategory', passport.setAuthenticated, SubCategoryCtl.trashSubCategory);

route.get('/restore-subcategory/:id', passport.setAuthenticated, SubCategoryCtl.restoreSubCategory);

route.get('/permanent-delete-subcategory/:id', passport.setAuthenticated, SubCategoryCtl.permanentDeleteSubCategory);
    
module.exports = route;