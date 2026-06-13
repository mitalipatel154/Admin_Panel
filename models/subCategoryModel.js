const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subcName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const subCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = subCategory;