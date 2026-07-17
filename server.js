require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require('./Routes/auth.routes');
const productRoutes = require('./Routes/product.routes');
const userRoutes = require('./Routes/user.routes');
const cartRoutes = require('./Routes/cart.routes');
const checkoutRoutes = require('./Routes/checkout.routes');
const adminRoutes = require('./Routes/admin.routes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});