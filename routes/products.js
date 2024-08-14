const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Thêm sản phẩm
router.post('/add', async (req, res) => {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.redirect('/products');
});

// Hiển thị sản phẩm
router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.render('product', { products });
    }catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Hiển thị sản phẩm
router.get('/sp', async (req, res) => {
    try{
        const products = await Product.find();
        res.render('product', { products });
    }catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Hiển thị form thêm sản phẩm
router.get('/add', (req, res) => {
    res.render('add-product');
});
// Xử lý form thêm sản phẩm
router.post('/add', async (req, res) => {
    const { name, price,price_old, description } = req.body;
    try {
        const newProduct = new Product({ name, price, price_old, description });
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Hiển thị form sửa sản phẩm
router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('edit-product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Xử lý form sửa sản phẩm
router.post('/edit/:id', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true }
        );
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Xóa sản phẩm
router.get('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
