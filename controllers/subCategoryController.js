const SubCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');

module.exports.addSubCategoryPage = async (req, res) => {
    try {

        let categoryData = await Category.find({
            isDeleted: false
        });

        return res.render('add-subcategory', {
            categoryData
        });

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.insertSubCategory = async (req, res) => {
    try {

        await SubCategory.create({
            subcName: req.body.subcName,
            categoryId: req.body.categoryId,
            status: req.body.status
        });

        req.flash('success', 'SubCategory Added Successfully');

        return res.redirect('/view-subcategory');

    } catch (err) {
        console.log(err);
        return res.redirect('/add-subcategory');
    }
};

module.exports.viewSubCategory = async (req, res) => {
    try {

        let subCategoryData = await SubCategory.find({
            isDeleted: false
        }).populate('categoryId');

        return res.render('view-subcategory', {
            subCategoryData
        });

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.editSubCategoryPage = async (req,res)=>{

    let subCategoryData =
        await SubCategory.findById(
            req.params.id
        );

    let categoryData =
        await Category.find({
            isDeleted:false
        });

    return res.render(
        'edit-subcategory',
        {
            subcategory: subCategoryData,
            categoryData
        }
    );
}

module.exports.updateSubCategory = async (req,res)=>{

    await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
            subcName:req.body.subcName,
            categoryId:req.body.categoryId
        }
    );

    req.flash(
        'success',
        'SubCategory Updated'
    );

    return res.redirect('/view-subcategory');
}



module.exports.deleteSubCategory = async (req,res)=>{
    try{

        await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted : true
            }
        );

        req.flash(
            'success',
            'SubCategory moved to trash'
        );

        return res.redirect('/view-subcategory');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.trashSubCategory = async (req,res)=>{

    let trashData = await SubCategory.find({
        isDeleted:true
    }).populate('categoryId');

    return res.render('trash',{
        trashData,
        type:'subcategory'
    });
}

module.exports.restoreSubCategory = async (req,res)=>{

    await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
            isDeleted : false
        }
    );

    req.flash(
        'success',
        'SubCategory Restored'
    );

    return res.redirect('/trash-subcategory');
}

module.exports.permanentDeleteSubCategory = async (req,res)=>{

    await SubCategory.findByIdAndDelete(
        req.params.id
    );

    req.flash(
        'success',
        'SubCategory Deleted Permanently'
    );

    return res.redirect('/trash-subcategory');
}

module.exports.changeSubCategoryStatus = async (req,res)=>{

    try{

        let subCategory = await SubCategory.findById(
            req.params.id
        );

        await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                status : !subCategory.status
            }
        );

        return res.redirect('/view-subcategory');

    }catch(err){

        console.log(err);
        return res.redirect('back');

    }

}