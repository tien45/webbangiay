const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Product = require('./models/Product');

const app = express();

// Cấu hình MongoDB
mongoose.connect('mongodb://localhost/webgiay');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use(express.static('public'));

// Trang chủ
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();  // Lấy danh sách sản phẩm từ database
        res.render('index', { products }); // Truyền biến products vào view
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
app.get('/sp', (req, res) => {
    res.render('sp');
});
app.get('/giaynike', (req, res) => {
    res.render('giaynike');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/resgiter', (req, res) => {
    res.render('resgiter');
});
app.get('/giayadidas', (req, res) => {
    res.render('giayadidas');
});
app.get('/giaylacoste', (req, res) => {
    res.render('giaylacoste');
});
app.get('/giaythethao', (req, res) => {
    res.render('giaythethao');
});
app.get('/puma', (req, res) => {
    res.render('puma');
});
app.get('/asics', (req, res) => {
    res.render('asics');
});
app.get('/sale', (req, res) => {
    res.render('sale');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
