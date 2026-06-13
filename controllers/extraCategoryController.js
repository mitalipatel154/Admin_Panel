const ExtraCategory = require('../models/extraCategoryModel');
const SubCategory = require('../models/subCategoryModel');

module.exports.addExtraCategoryPage = async (req,res)=>{

    let subCategoryData = await SubCategory.find({
        isDeleted:false
    });

    return res.render(
        'add-extracategory',
        {
            subCategoryData
        }
    );
}

module.exports.insertExtraCategory = async (req,res)=>{

    await ExtraCategory.create({
        extracName:req.body.extracName,
        subCategoryId:req.body.subCategoryId,
        status:req.body.status
    });

    req.flash(
        'success',
        'Extra Category Added'
    );

    return res.redirect(
        '/view-extracategory'
    );
}

module.exports.viewExtraCategory = async (req,res)=>{

    let extraCategoryData =
    await ExtraCategory.find({
        isDeleted:false
    })
    .populate('subCategoryId');

    return res.render(
        'view-extracategory',
        {
            extraCategoryData
        }
    );
}

module.exports.editExtraCategoryPage = async (req,res)=>{

    let extraCategoryData = await ExtraCategory.findById(
        req.params.id
    );

    let subCategoryData = await SubCategory.find({
        isDeleted:false
    });

    return res.render(
        'edit-extracategory',
        {
            extraCategoryData,
            subCategoryData
        }
    );
}

module.exports.updateExtraCategory = async (req,res)=>{

    await ExtraCategory.findByIdAndUpdate(
        req.params.id,
        {
            extracName:req.body.extracName,
            subCategoryId:req.body.subCategoryId
        }
    );

    req.flash(
        'success',
        'Extra Category Updated Successfully'
    );

    return res.redirect('/view-extracategory');
}

module.exports.deleteExtraCategory = async (req, res) => {
    try {

        await ExtraCategory.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true }
        );

        req.flash(
            'success',
            'Extra Category moved to trash'
        );

        return res.redirect('/view-extracategory');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('back');
    }
};

module.exports.trashExtraCategory = async (req,res)=>{

    let trashData = await ExtraCategory.find({
        isDeleted:true
    }).populate('subCategoryId');

    return res.render('trash',{
        trashData,
        type:'extracategory'
    });
}

module.exports.restoreExtraCategory = async (req, res) => {
    try {

        await ExtraCategory.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false }
        );

        req.flash(
            'success',
            'Extra Category restored successfully'
        );

        return res.redirect('/trash-extracategory');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Restore failed');
        return res.redirect('back');
    }
};

module.exports.permanentDeleteExtraCategory = async (req, res) => {
    try {

        await ExtraCategory.findByIdAndDelete(req.params.id);

        req.flash(
            'success',
            'Extra Category deleted permanently'
        );

        return res.redirect('/trash-extracategory');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Delete failed');
        return res.redirect('back');
    }
};

module.exports.changeExtraCategoryStatus = async (req, res) => {
    try {

        let extra = await ExtraCategory.findById(req.params.id);

        await ExtraCategory.findByIdAndUpdate(req.params.id, {
            status: !extra.status
        });

        req.flash(
            'success',
            'Status updated successfully'
        );

        return res.redirect('/view-extracategory');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Status update failed');
        return res.redirect('back');
    }
};

