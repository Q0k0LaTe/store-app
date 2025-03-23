import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Helper function to initialize the cart
const initCart = (req) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
};

// GET /cart - Display cart contents
router.get('/', (req, res) => {
  initCart(req);
  let total = 0;
  
  // Calculate the total price
  if (req.session.cart && req.session.cart.length > 0) {
    total = req.session.cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
  
  res.render('cart/index', { 
    title: 'Shopping Cart', 
    cartItems: req.session.cart || [],
    total: total
  });
});

// POST /cart/add - Add a product to the cart
router.post('/add', async (req, res) => {
  initCart(req);
  const { productId, quantity } = req.body;
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    const existingItem = req.session.cart.find(item => 
      item.product._id.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += Number(quantity) || 1;
    } else {
      req.session.cart.push({ product, quantity: Number(quantity) || 1 });
    }
    
    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /cart/remove - Remove an item from the cart
router.post('/remove', (req, res) => {
  const { productId } = req.body;
  
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => 
      item.product._id.toString() !== productId);
  }
  
  res.redirect('/cart');
});

// POST /cart/update - Update item quantity in the cart
router.post('/update', (req, res) => {
  const { productId, quantity } = req.body;
  
  if (req.session.cart) {
    const item = req.session.cart.find(item => 
      item.product._id.toString() === productId);
    
    if (item) {
      item.quantity = Number(quantity);
      
      // Remove item if quantity is 0 or less
      if (item.quantity <= 0) {
        req.session.cart = req.session.cart.filter(item => 
          item.product._id.toString() !== productId);
      }
    }
  }
  
  res.redirect('/cart');
});

// POST /cart/clear - Clear the entire cart
router.post('/clear', (req, res) => {
  req.session.cart = [];
  res.redirect('/cart');
});

export default router;