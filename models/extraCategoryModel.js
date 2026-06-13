const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({

    extracName: {
        type: String,
        required: true,
        trim: true
    },

    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
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

},{
    timestamps:true
});

const ExtraCategory = mongoose.model('ExtraCategory', extraCategorySchema);

module.exports = ExtraCategory;