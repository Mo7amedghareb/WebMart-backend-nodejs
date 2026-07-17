const Cart = require('../Models/Cart');
const Order = require('../Models/Order');
const Product = require('../Models/Product');

exports.checkout = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod = 'card' } = req.body;

        // Validate shipping address fields
        const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'country'];
        for (const field of requiredFields) {
            if (!shippingAddress?.[field]) {
                return res.status(400).json({ message: `Shipping address missing: ${field}` });
            }
        }

        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product', 'name image price stock');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Check stock for each item
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for: ${item.product.name}`,
                });
            }
        }

        // Build order items
        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.price,
            quantity: item.quantity,
        }));

        // Create the order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice: cart.totalPrice,
        });

        // Deduct stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity },
            });
        }

        // Clear the cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};