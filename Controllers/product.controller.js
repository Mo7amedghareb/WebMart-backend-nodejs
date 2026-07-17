const Product = require('../Models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, sort } = req.query;

        const filter = {};

        if (category) filter.category = category;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        let sortOption = {};
        if (sort === 'price_asc') sortOption = { price: 1 };
        else if (sort === 'price_desc') sortOption = { price: -1 };
        else if (sort === 'rating') sortOption = { rating: -1 };
        else sortOption = { createdAt: -1 };

        const products = await Product.find(filter).sort(sortOption);

        res.json({ count: products.length, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};