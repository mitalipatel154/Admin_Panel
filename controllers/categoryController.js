const Category = require('../models/categoryModel');

module.exports.addCategoryPage = (req, res) => {
    return res.render('add-category');
};

module.exports.insertCategory = async (req, res) => {
    try {

        await Category.create({
            cName: req.body.cName,
            status: req.body.status || true
        });

        req.flash('success', 'Category Added Successfully');
        return res.redirect('/view-category');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('/add-category');
    }
};


module.exports.viewCategory = async (req, res) => {
    try {
        const categories = await Category.find({
            isDeleted: false
        });

        return res.render('view-category', {
            categories
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.editCategoryPage = async (req, res) => {
    try {

        let category = await Category.findById(req.params.id);

        return res.render('edit-category', {
            category
        });

    } catch (err) {
        console.log(err);
        return res.redirect('/view-category');
    }
};

module.exports.updateCategory = async (req, res) => {
    try {

        await Category.findByIdAndUpdate(
            req.params.id,
            {
                cName: req.body.cName,
                status: req.body.status
            }
        );

        req.flash('success', 'Category Updated Successfully');

        return res.redirect('/view-category');

    } catch (err) {
        console.log(err);
        return res.redirect('/view-category');
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        });

        req.flash('success', 'Category moved to trash');
        return res.redirect('/view-category');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Unable to delete category');
        return res.redirect('/view-category');
    }
};

module.exports.trashCategory = async (req, res) => {

    const trashData = await Category.find({
        isDeleted: true
    });

    return res.render('trash-category', {
        trashData
    });
};

module.exports.restoreCategory = async (req, res) => {

    await Category.findByIdAndUpdate(req.params.id, {
        isDeleted: false
    });

    req.flash('success', 'Category restored successfully');

    return res.redirect('/trash-category');
};

module.exports.permanentDeleteCategory = async (req, res) => {

    await Category.findByIdAndDelete(req.params.id);

    req.flash('success', 'Category permanently deleted');

    return res.redirect('/trash-category');
};

module.exports.changeCategoryStatus = async (req, res) => {
    try {

        let category = await Category.findById(req.params.id);

        await Category.findByIdAndUpdate(
            req.params.id,
            {
                status: !category.status
            }
        );

        req.flash('success', 'Category Status Updated');

        return res.redirect('/view-category');

    } catch (err) {
        console.log(err);

        req.flash('error', 'Unable To Update Status');

        return res.redirect('/view-category');
    }
};