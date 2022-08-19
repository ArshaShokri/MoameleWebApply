const ejs = require('ejs');
const ProductModel = require('../Models/Product.js');

module.exports = {
    Render: function(req, res) {
        ProductModel.findOne({ _id: req.params.id }, (err, product) => {
            if (err) {
                res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
            } else if (!product) {
                res.status(404).send('Product does not exist');
            } else {
                res.render('Product', { product: product });
            }
        });
    }, 
    addProduct: function(req, res) {
        const product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            shortdescription: req.body.shortdescription,
            price: req.body.price
        });
        product.save((err, product) => {
            if (err) {
                res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
            } else {
                res.redirect('/');
                console.log('Product Created: ' + product);
            }
        });
    },
    RenderAddProduct: function(req, res) {
        res.render('Add');
    }
}