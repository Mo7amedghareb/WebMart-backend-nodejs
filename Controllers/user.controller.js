const Favourite = require('../Models/Favourite');

exports.getFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.findOne({ user: req.user._id })
            .populate('products', 'name image price rating category');

        if (!favourites) {
            return res.json({ products: [] });
        }

        res.json({ products: favourites.products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addToFavourites = async (req, res) => {
    try {
        const { productId } = req.body;

        let favourites = await Favourite.findOne({ user: req.user._id });

        if (!favourites) {
            favourites = new Favourite({ user: req.user._id, products: [] });
        }

        const alreadyAdded = favourites.products.some(
            (p) => p.toString() === productId
        );

        if (alreadyAdded) {
            return res.status(400).json({ message: 'Product already in favourites' });
        }

        favourites.products.push(productId);
        await favourites.save();

        res.json({ message: 'Added to favourites', favourites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.findOne({ user: req.user._id });

        if (!favourites) {
            return res.status(404).json({ message: 'Favourites not found' });
        }

        favourites.products = favourites.products.filter(
            (p) => p.toString() !== req.params.id
        );

        await favourites.save();

        res.json({ message: 'Removed from favourites', favourites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};