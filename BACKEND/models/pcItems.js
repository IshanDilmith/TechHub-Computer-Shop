const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pcItemsSchema = new Schema({
    itemName: {
        type : String,
        required: true
    },
    itemPrice: {
        type : Number,
        required: true,
        min : 0
    },
    itemDescription: {
        type : String,
        required: true
    },
    itemCategory: {
        type : String,
        required: true
    },
    itemImage: {
        type : String,
        required: true
    },
    itemStock: {
        type : Number,
        required: true,
        min : 0
    }
});

const pcItems = mongoose.model('pcItems', pcItemsSchema);

module.exports = pcItems;