const express = require('express');
const route = express.Router();

const CategoryCtl = require('../controllers/categoryController');

route.get('/add-category', CategoryCtl.addCategoryPage);

route.post('/insert-category', CategoryCtl.insertCategory);

route.get('/view-category', CategoryCtl.viewCategory);

route.get('/delete-category/:id', CategoryCtl.deleteCategory);

route.get('/trash-category', CategoryCtl.trashCategory);

route.get('/restore-category/:id', CategoryCtl.restoreCategory);

route.get('/permanent-delete-category/:id', CategoryCtl.permanentDeleteCategory);

route.get('/edit-category/:id', CategoryCtl.editCategoryPage);

route.post('/update-category/:id', CategoryCtl.updateCategory);

route.get('/delete-category/:id', CategoryCtl.deleteCategory);

route.get('/change-category-status/:id', CategoryCtl.changeCategoryStatus);

module.exports = route;