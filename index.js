const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const port = process.env.PORT || 3000;

const IndexController = require('./Controllers/IndexController.js');
const AuthController = require('./Controllers/AuthController.js');
const ProductController = require('./Controllers/ProductController.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Static')));

app.get('/', IndexController.Render);
app.get('/product/:id', ProductController.Render);
app.get('/addproduct', ProductController.RenderAddProduct);
app.get('/login', AuthController.RenderLogin);
app.get('/register', AuthController.RenderRegister);
app.post('/add', ProductController.addProduct);
app.post('/login', AuthController.Login);
app.post('/register', AuthController.Register);

mongoose.connect('mongodb+srv://FChatDB:ARSHAshokri8899@fchatdb.1zcr1ck.mongodb.net/moamele', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});