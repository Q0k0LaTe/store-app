import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// GET /products – fetch and display all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products/index', { title: 'Product Listings', products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET /products/add - display the form to add a new product
router.get('/add', (req, res) => {
  res.render('products/add', { title: 'Add New Product' });
});

// POST /products/add - handle the form submission
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    
    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl
    });
    
    // Save product to database
    await newProduct.save();
    
    // Redirect to products page
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;