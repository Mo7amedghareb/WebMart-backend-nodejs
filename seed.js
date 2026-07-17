require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected');
};

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  image:       { type: String },
  stock:       { type: Number, default: 0 },
  rating:      { type: Number, default: 0 },
  numReviews:  { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const products = [
  {
    name: 'Essential Crew Tee',
    description: 'A wardrobe staple crafted from 100% certified organic cotton. Featuring a clean crew neckline and a relaxed fit, this tee delivers effortless everyday comfort. The optic white colorway pairs seamlessly with any outfit, making it a versatile essential for modern minimal dressing.',
    price: 250.00,
    category: 'men',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675071/white_t-shirt_vnd71y.png',
    stock: 85,
    rating: 4.5,
    numReviews: 32,
  },
  {
    name: 'Minimalist Trench Coat',
    description: 'An elevated take on the classic trench, tailored from a premium cotton blend in a soft light beige tone. Structured shoulders and a clean belt closure create a sophisticated silhouette that transitions effortlessly from the office to the weekend. Timeless design with a modern, minimal edge.',
    price: 845.00,
    category: 'women',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675065/yellow-coat_vywnj7.png',
    stock: 40,
    rating: 4.8,
    numReviews: 18,
  },
  {
    name: 'Archival Wool Overcoat',
    description: 'Inspired by mid-century tailoring, this overcoat is woven from a fine oatmeal melange wool blend that offers warmth without weight. The relaxed single-breasted cut and dropped shoulders give it a contemporary, oversized feel while maintaining a refined, polished look for cooler seasons.',
    price: 845.00,
    category: 'women',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675068/over_coat_hdavez.png',
    stock: 30,
    rating: 4.7,
    numReviews: 14,
  },
  {
    name: 'Urban Velocity Sneaker',
    description: 'Built for the streets and designed for performance, the Urban Velocity Sneaker features a breathable crimson performance mesh upper with a cushioned EVA midsole for all-day support. Whether you are heading to the gym or navigating the city, these sneakers combine bold style with athletic functionality.',
    price: 545.00,
    category: 'shoes',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675067/red_shoes_gzfrkn.png',
    stock: 60,
    rating: 4.6,
    numReviews: 27,
  },
  {
    name: 'Structured Tote Bag',
    description: 'Handcrafted from supple midnight black calf leather, this structured tote is designed to carry your essentials in style. Reinforced handles, a spacious interior with a zippered pocket, and clean stitching details make it the perfect companion for both work and leisure. A true investment piece built to last.',
    price: 450.00,
    category: 'bags',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675056/black_bag_xfj9d9.png',
    stock: 50,
    rating: 4.9,
    numReviews: 41,
  },
  {
    name: 'Fine Merino Crewneck',
    description: 'Knitted from extra-fine merino wool, this crewneck sweater offers exceptional softness against the skin with natural temperature-regulating properties. The deep navy colorway is versatile and elegant, making it easy to layer over a shirt or wear on its own for a refined, understated look.',
    price: 220.00,
    category: 'men',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675067/navy_sweatshirt_rff2gm.png',
    stock: 70,
    rating: 4.4,
    numReviews: 23,
  },
  {
    name: 'Tapered Wool Trouser',
    description: 'Cut from a medium-weight charcoal wool blend, these tapered trousers offer a sharp, modern silhouette with a comfortable mid-rise waist. The clean front pleats and tapered leg create a polished appearance suitable for the office or smart-casual occasions. A refined foundation for any elevated look.',
    price: 400.00,
    category: 'men',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675055/grey_trousers_nmtpfj.png',
    stock: 45,
    rating: 4.3,
    numReviews: 19,
  },
  {
    name: 'Relaxed Linen Shirt',
    description: 'Woven from 100% premium linen, this relaxed-fit shirt is perfect for warm days when breathability and style go hand in hand. The optic white finish keeps things clean and crisp, while the slightly oversized cut drapes effortlessly over the body. Available in a large fit for a laid-back, effortless aesthetic.',
    price: 845.00,
    category: 'men',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675066/white_chimese_qrnivo.png',
    stock: 55,
    rating: 4.6,
    numReviews: 35,
  },
  {
    name: 'Precision Runner X1',
    description: 'The Precision Runner X1 is engineered for serious runners who refuse to compromise on style. Featuring a heritage red colorway with a lightweight knit upper and a responsive foam outsole, these shoes deliver energy return with every stride. A bold silhouette designed for speed, endurance, and turning heads.',
    price: 850.00,
    category: 'shoes',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675055/red_running_shoes_dzkdvm.png',
    stock: 38,
    rating: 4.7,
    numReviews: 29,
  },
  {
    name: 'The Meridian Timepiece',
    description: 'A masterpiece of precision engineering, The Meridian Timepiece features a scratch-resistant sapphire crystal face set in a brushed stainless steel case. The minimalist dial with clean indices reflects a commitment to understated luxury. Water-resistant to 50 meters, it is equally at home at a boardroom meeting or a weekend adventure.',
    price: 400.00,
    category: 'watches',
    image: 'https://res.cloudinary.com/dhv0mqjmo/image/upload/v1782675052/large_silver_watch_ocjroj.png',
    stock: 25,
    rating: 4.9,
    numReviews: 47,
  },
];

const seed = async () => {
  try {
    await connectDB();

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`⚠️  Found ${existing} products already in DB.`);
      console.log('Deleting old products and inserting fresh ones...');
      await Product.deleteMany({});
    }

    await Product.insertMany(products);
    console.log(`✅  ${products.length} products inserted successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  }
};

seed();