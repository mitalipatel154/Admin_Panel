const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagePath = "uploads/productImages";

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const productSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },

    extraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory"
    },

    productImage: {
        type: String,
        default: ''
    },

    status: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

productSchema.statics.uploadProductImage = multer({
    storage: productStorage
}).single('productImage');

productSchema.statics.imagePath = imagePath;

module.exports = mongoose.model('Product', productSchema);