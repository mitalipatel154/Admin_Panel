const express = require('express');

const route = express.Router();

const passport = require('passport');

const ExtraCategoryCtl = require('../controllers/extraCategoryController');

route.get('/add-extracategory', passport.setAuthenticated, ExtraCategoryCtl.addExtraCategoryPage);

route.post('/insert-extracategory', passport.setAuthenticated, ExtraCategoryCtl.insertExtraCategory);

route.get( '/view-extracategory', passport.setAuthenticated, ExtraCategoryCtl.viewExtraCategory);

route.get('/edit-extracategory/:id', passport.setAuthenticated, ExtraCategoryCtl.editExtraCategoryPage);

route.post('/update-extracategory/:id', passport.setAuthenticated, ExtraCategoryCtl.updateExtraCategory);

route.get('/delete-extracategory/:id', passport.setAuthenticated, ExtraCategoryCtl.deleteExtraCategory);

route.get('/trash-extracategory', passport.setAuthenticated, ExtraCategoryCtl.trashExtraCategory);

route.get('/restore-extracategory/:id', passport.setAuthenticated, ExtraCategoryCtl.restoreExtraCategory);

route.get('/permanent-delete-extracategory/:id', passport.setAuthenticated, ExtraCategoryCtl.permanentDeleteExtraCategory);

route.get('/change-extracategory-status/:id', passport.setAuthenticated, ExtraCategoryCtl.changeExtraCategoryStatus);

module.exports = route;