const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    }
});

const itemCategory = mongoose.model('itemCategory', itemCategorySchema);
module.exports = itemCategory;