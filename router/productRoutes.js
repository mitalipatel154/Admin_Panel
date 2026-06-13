const express = require('express');
const route = express.Router();
const ProductCtl = require('../controllers/productController');
const Product = require('../models/productModel');
const passport = require('passport');
const roleAuth = require('../middleware/roleAuth');

route.get('/add-product',passport.setAuthenticated,roleAuth.checkRole('Super Admin','Admin'),ProductCtl.addProductPage);

route.post('/insertProduct',passport.setAuthenticated,roleAuth.checkRole('Super Admin','Admin'),Product.uploadProductImage,ProductCtl.insertProduct);

route.get('/view-product',passport.setAuthenticated,ProductCtl.viewProduct);

route.get('/view-product', passport.setAuthenticated, ProductCtl.viewProduct);

route.get('/edit-product/:id',passport.setAuthenticated, roleAuth.checkRole('Super Admin','Admin'), ProductCtl.editProductPage);

route.post('/update-product/:id',passport.setAuthenticated,roleAuth.checkRole('Super Admin','Admin'),Product.uploadProductImage,ProductCtl.updateProduct);

route.get('/delete-product/:id',passport.setAuthenticated,roleAuth.checkRole('Super Admin', 'Admin'),ProductCtl.deleteProduct);

module.exports = route;