const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product', 'name image price stock');

        if (!cart) {
            return res.json({ items: [], totalPrice: 0 });
        }

        res.json({ cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price,
            });
        }

        cart.calcTotal();
        await cart.save();

        res.json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemExists = cart.items.find(
            (item) => item._id.toString() === req.params.id
        );

        if (!itemExists) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== req.params.id
        );

        cart.calcTotal();
        await cart.save();

        res.json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item._id.toString() === req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // check stock
        const product = await Product.findById(item.product);
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock' });
        }

        item.quantity = quantity;
        cart.calcTotal();
        await cart.save();

        res.json({ message: 'Cart updated', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};