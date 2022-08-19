const mangoose = require('mongoose');
const Schema = mangoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortdescription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { collection: "products" });

module.exports = mangoose.model('Product', productSchema);