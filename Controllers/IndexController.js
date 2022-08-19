const ejs = require('ejs');
const ProductModel = require('../Models/Product.js');

module.exports = {
    Render: function(req, res) {
        ProductModel.find({}, (err, products) => {
            if (err) {
                res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
            } else {
                res.render('Shop', { products: products });
            }
        });
    }
}