import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
const app = express();
// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://Q0k0LaTes:Hanzhuoting0324-@cluster0.ngvjs.mongodb.net/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB Atlas connection error:', err));
// Home route – render the homepage
app.get('/', (req, res) => {
res.render('index', { title: 'Home' });
});
// Mount products route
app.use('/products', productsRouter);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
