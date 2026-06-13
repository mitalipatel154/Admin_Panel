const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const ExtraCategory = require('../models/extraCategoryModel');

module.exports.addProductPage = async (req, res) => {
    try {

        const categoryData = await Category.find({
            isDeleted: false
        });

        const subCategoryData = await SubCategory.find({
            isDeleted: false
        });

        const extraCategoryData = await ExtraCategory.find({
            isDeleted: false
        });

         console.log("Category =>", categoryData);
    console.log("SubCategory =>", subCategoryData);
    console.log("ExtraCategory =>", extraCategoryData);

        return res.render('add-product', {
            categoryData,
            subCategoryData,
            extraCategoryData
        });

    } catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

const Product = require('../models/productModel');

module.exports.insertProduct = async (req,res)=>{

    if(req.file){
        req.body.productImage = req.file.filename;
    }

    await Product.create(req.body);

    req.flash('success','Product Added Successfully');

    return res.redirect('/view-product');

}

module.exports.viewProduct = async (req,res)=>{

    let productData = await Product.find()

    .populate('categoryId')
    .populate('subCategoryId')
    .populate('extraCategoryId');

    return res.render('view-product',{
        productData
    });

}

module.exports.editProductPage = async (req, res) => {
    try {

        let product = await Product.findById(req.params.id);

        const categoryData = await Category.find({ isDeleted: false });
        const subCategoryData = await SubCategory.find({ isDeleted: false });
        const extraCategoryData = await ExtraCategory.find({ isDeleted: false });

        return res.render('edit-product', {
            product,
            categoryData,
            subCategoryData,
            extraCategoryData
        });

    } catch (err) {
        console.log(err);
        return res.redirect('/view-product');
    }
};

module.exports.updateProduct = async (req, res) => {
    try {

        if (req.file) {
            req.body.productImage = req.file.filename;
        }

        await Product.findByIdAndUpdate(req.params.id, req.body);

        req.flash('success', 'Product updated successfully');

        return res.redirect('/view-product');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Update failed');
        return res.redirect('/view-product');
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        });

        req.flash('success', 'Product moved to Trash');
        return res.redirect('/view-product');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Unable to delete product');
        return res.redirect('/view-product');
    }
};