const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const products = [
  // Smartphones (15 products)
  {
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.",
    price: 1199,
    category: "smartphones",
    brand: "Apple",
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      "https://images.unsplash.com/photo-1695048133382-0eb3a9b0f726"
    ],
    specifications: {
      storage: "256GB",
      ram: "8GB",
      screen: "6.7 inch",
      camera: "48MP",
      battery: "4422mAh"
    },
    rating: 4.8,
    numReviews: 234
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android flagship with S Pen, 200MP camera, and AI-powered features for enhanced productivity.",
    price: 1299,
    category: "smartphones",
    brand: "Samsung",
    stock: 38,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ],
    specifications: {
      storage: "512GB",
      ram: "12GB",
      screen: "6.8 inch",
      camera: "200MP",
      battery: "5000mAh"
    },
    rating: 4.7,
    numReviews: 189
  },
  {
    name: "Google Pixel 8 Pro",
    description: "Pure Android experience with exceptional computational photography and 7 years of software updates.",
    price: 999,
    category: "smartphones",
    brand: "Google",
    stock: 52,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.7 inch",
      camera: "50MP",
      battery: "5050mAh"
    },
    rating: 4.6,
    numReviews: 156
  },
  {
    name: "OnePlus 12",
    description: "Flagship killer with Snapdragon 8 Gen 3, 100W fast charging, and Hasselblad camera system.",
    price: 799,
    category: "smartphones",
    brand: "OnePlus",
    stock: 67,
    images: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.82 inch",
      camera: "50MP",
      battery: "5400mAh"
    },
    rating: 4.5,
    numReviews: 142
  },
  {
    name: "iPhone 14",
    description: "Previous generation iPhone with excellent performance, great cameras, and long battery life.",
    price: 699,
    category: "smartphones",
    brand: "Apple",
    stock: 83,
    images: [
      "https://images.unsplash.com/photo-1663499482523-1c0d7da41b23",
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb"
    ],
    specifications: {
      storage: "128GB",
      ram: "6GB",
      screen: "6.1 inch",
      camera: "12MP",
      battery: "3279mAh"
    },
    rating: 4.6,
    numReviews: 467
  },
  {
    name: "Xiaomi 14 Pro",
    description: "Premium flagship with Leica cameras, 120W HyperCharge, and stunning AMOLED display.",
    price: 899,
    category: "smartphones",
    brand: "Xiaomi",
    stock: 41,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ],
    specifications: {
      storage: "512GB",
      ram: "16GB",
      screen: "6.73 inch",
      camera: "50MP",
      battery: "4880mAh"
    },
    rating: 4.5,
    numReviews: 98
  },
  {
    name: "Samsung Galaxy Z Fold 5",
    description: "Revolutionary foldable phone with 7.6-inch main display, perfect for multitasking and productivity.",
    price: 1799,
    category: "smartphones",
    brand: "Samsung",
    stock: 23,
    images: [
      "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b6",
      "https://images.unsplash.com/photo-1592286927505-02c0e1807d14"
    ],
    specifications: {
      storage: "512GB",
      ram: "12GB",
      screen: "7.6 inch foldable",
      camera: "50MP",
      battery: "4400mAh"
    },
    rating: 4.7,
    numReviews: 87
  },
  {
    name: "Nothing Phone 2",
    description: "Unique transparent design with Glyph Interface, powerful performance, and clean software experience.",
    price: 599,
    category: "smartphones",
    brand: "Nothing",
    stock: 56,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.7 inch",
      camera: "50MP",
      battery: "4700mAh"
    },
    rating: 4.4,
    numReviews: 124
  },
  {
    name: "Motorola Edge 40 Pro",
    description: "Flagship with clean Android, 165Hz display, and exceptional battery life with wireless charging.",
    price: 699,
    category: "smartphones",
    brand: "Motorola",
    stock: 34,
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.67 inch",
      camera: "50MP",
      battery: "4600mAh"
    },
    rating: 4.3,
    numReviews: 76
  },
  {
    name: "ASUS ROG Phone 7",
    description: "Ultimate gaming phone with 165Hz display, AeroActive cooling, and massive 6000mAh battery.",
    price: 999,
    category: "smartphones",
    brand: "ASUS",
    stock: 29,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ],
    specifications: {
      storage: "512GB",
      ram: "16GB",
      screen: "6.78 inch",
      camera: "50MP",
      battery: "6000mAh"
    },
    rating: 4.6,
    numReviews: 112
  },
  {
    name: "Sony Xperia 1 V",
    description: "Professional-grade smartphone with 4K HDR OLED display and advanced camera controls for photography.",
    price: 1199,
    category: "smartphones",
    brand: "Sony",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.5 inch 4K",
      camera: "48MP",
      battery: "5000mAh"
    },
    rating: 4.5,
    numReviews: 54
  },
  {
    name: "Oppo Find X6 Pro",
    description: "Camera-centric flagship with Hasselblad partnership, exceptional low-light performance.",
    price: 949,
    category: "smartphones",
    brand: "Oppo",
    stock: 37,
    images: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.82 inch",
      camera: "50MP",
      battery: "5000mAh"
    },
    rating: 4.4,
    numReviews: 89
  },
  {
    name: "Realme GT 5",
    description: "Value flagship with Snapdragon 8 Gen 2, 240W fast charging, and aggressive pricing.",
    price: 549,
    category: "smartphones",
    brand: "Realme",
    stock: 72,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ],
    specifications: {
      storage: "256GB",
      ram: "12GB",
      screen: "6.74 inch",
      camera: "50MP",
      battery: "5240mAh"
    },
    rating: 4.3,
    numReviews: 143
  },
  {
    name: "Vivo X100 Pro",
    description: "Imaging powerhouse with Zeiss optics, advanced night mode, and stunning portrait capabilities.",
    price: 899,
    category: "smartphones",
    brand: "Vivo",
    stock: 31,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    specifications: {
      storage: "512GB",
      ram: "16GB",
      screen: "6.78 inch",
      camera: "50MP",
      battery: "5400mAh"
    },
    rating: 4.5,
    numReviews: 67
  },
  {
    name: "Honor Magic 6 Pro",
    description: "Premium flagship with advanced AI features, excellent battery life, and stunning display.",
    price: 799,
    category: "smartphones",
    brand: "Honor",
    stock: 44,
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a"
    ],
    specifications: {
      storage: "512GB",
      ram: "12GB",
      screen: "6.8 inch",
      camera: "50MP",
      battery: "5600mAh"
    },
    rating: 4.4,
    numReviews: 92
  },

  // Laptops (12 products)
  {
    name: "MacBook Pro 16-inch M3 Max",
    description: "Ultimate professional laptop with M3 Max chip, stunning Liquid Retina XDR display, and all-day battery life.",
    price: 3499,
    category: "laptops",
    brand: "Apple",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9"
    ],
    specifications: {
      processor: "Apple M3 Max",
      ram: "36GB",
      storage: "1TB SSD",
      screen: "16.2 inch Liquid Retina XDR",
      graphics: "Integrated GPU"
    },
    rating: 4.9,
    numReviews: 156
  },
  {
    name: "Dell XPS 15",
    description: "Premium Windows laptop with stunning InfinityEdge display, powerful Intel processor, and elegant design.",
    price: 1899,
    category: "laptops",
    brand: "Dell",
    stock: 42,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"
    ],
    specifications: {
      processor: "Intel Core i7-13700H",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "15.6 inch 4K OLED",
      graphics: "NVIDIA RTX 4050"
    },
    rating: 4.6,
    numReviews: 234
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    description: "Business ultrabook with military-grade durability, excellent keyboard, and long battery life.",
    price: 1699,
    category: "laptops",
    brand: "Lenovo",
    stock: 36,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
    ],
    specifications: {
      processor: "Intel Core i7-1365U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "14 inch 2.8K",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.7,
    numReviews: 187
  },
  {
    name: "ASUS ROG Zephyrus G16",
    description: "Gaming powerhouse in a slim form factor with RTX 4080, Mini LED display, and premium build quality.",
    price: 2499,
    category: "laptops",
    brand: "ASUS",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
      "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95"
    ],
    specifications: {
      processor: "Intel Core i9-13900H",
      ram: "32GB",
      storage: "1TB SSD",
      screen: "16 inch 2.5K 240Hz",
      graphics: "NVIDIA RTX 4080"
    },
    rating: 4.8,
    numReviews: 143
  },
  {
    name: "HP Spectre x360 14",
    description: "Versatile 2-in-1 convertible with gem-cut design, vibrant OLED display, and excellent pen support.",
    price: 1599,
    category: "laptops",
    brand: "HP",
    stock: 31,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
    ],
    specifications: {
      processor: "Intel Core i7-1355U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "13.5 inch 3K2K OLED",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.5,
    numReviews: 112
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight and powerful everyday laptop with M2 chip, fanless design, and exceptional battery life.",
    price: 1199,
    category: "laptops",
    brand: "Apple",
    stock: 67,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    ],
    specifications: {
      processor: "Apple M2",
      ram: "8GB",
      storage: "256GB SSD",
      screen: "13.6 inch Liquid Retina",
      graphics: "Integrated GPU"
    },
    rating: 4.7,
    numReviews: 489
  },
  {
    name: "Razer Blade 15",
    description: "Sleek gaming laptop with premium aluminum chassis, powerful performance, and RGB everything.",
    price: 2299,
    category: "laptops",
    brand: "Razer",
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
      "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95"
    ],
    specifications: {
      processor: "Intel Core i7-13800H",
      ram: "16GB",
      storage: "1TB SSD",
      screen: "15.6 inch QHD 240Hz",
      graphics: "NVIDIA RTX 4070"
    },
    rating: 4.6,
    numReviews: 167
  },
  {
    name: "Microsoft Surface Laptop 5",
    description: "Premium Windows laptop with Alcantara keyboard, PixelSense touchscreen, and Windows Hello.",
    price: 1299,
    category: "laptops",
    brand: "Microsoft",
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
    ],
    specifications: {
      processor: "Intel Core i7-1255U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "13.5 inch PixelSense",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.5,
    numReviews: 198
  },
  {
    name: "Acer Swift 3",
    description: "Budget-friendly ultrabook with solid performance, good battery life, and portable design.",
    price: 749,
    category: "laptops",
    brand: "Acer",
    stock: 58,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"
    ],
    specifications: {
      processor: "Intel Core i5-1235U",
      ram: "8GB",
      storage: "512GB SSD",
      screen: "14 inch Full HD",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.3,
    numReviews: 276
  },
  {
    name: "LG Gram 17",
    description: "Ultra-lightweight 17-inch laptop that weighs less than 3 pounds with exceptional battery life.",
    price: 1699,
    category: "laptops",
    brand: "LG",
    stock: 27,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
    ],
    specifications: {
      processor: "Intel Core i7-1360P",
      ram: "16GB",
      storage: "1TB SSD",
      screen: "17 inch WQXGA",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.6,
    numReviews: 89
  },
  {
    name: "MSI Creator Z16",
    description: "Content creator laptop with color-accurate display, powerful GPU, and excellent cooling system.",
    price: 2199,
    category: "laptops",
    brand: "MSI",
    stock: 21,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
      "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95"
    ],
    specifications: {
      processor: "Intel Core i9-12900H",
      ram: "32GB",
      storage: "1TB SSD",
      screen: "16 inch QHD+ Touch",
      graphics: "NVIDIA RTX 4060"
    },
    rating: 4.5,
    numReviews: 73
  },
  {
    name: "Samsung Galaxy Book3 Pro",
    description: "Sleek Windows laptop with AMOLED display, lightweight design, and seamless Samsung ecosystem integration.",
    price: 1449,
    category: "laptops",
    brand: "Samsung",
    stock: 33,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
    ],
    specifications: {
      processor: "Intel Core i7-1360P",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "14 inch 3K AMOLED",
      graphics: "Integrated Iris Xe"
    },
    rating: 4.4,
    numReviews: 124
  },

  // Tablets (8 products)
  {
    name: "iPad Pro 12.9-inch M2",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support for creativity.",
    price: 1099,
    category: "tablets",
    brand: "Apple",
    stock: 54,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1"
    ],
    specifications: {
      processor: "Apple M2",
      ram: "8GB",
      storage: "256GB",
      screen: "12.9 inch Liquid Retina XDR",
      camera: "12MP"
    },
    rating: 4.8,
    numReviews: 267
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "Massive Android tablet with 14.6-inch AMOLED display, S Pen included, and desktop-like DeX mode.",
    price: 1199,
    category: "tablets",
    brand: "Samsung",
    stock: 37,
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    ],
    specifications: {
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "512GB",
      screen: "14.6 inch Dynamic AMOLED",
      camera: "13MP"
    },
    rating: 4.7,
    numReviews: 143
  },
  {
    name: "iPad Air M1",
    description: "Versatile tablet with M1 chip, 10.9-inch Liquid Retina display, perfect balance of power and portability.",
    price: 599,
    category: "tablets",
    brand: "Apple",
    stock: 73,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1"
    ],
    specifications: {
      processor: "Apple M1",
      ram: "8GB",
      storage: "64GB",
      screen: "10.9 inch Liquid Retina",
      camera: "12MP"
    },
    rating: 4.6,
    numReviews: 412
  },
  {
    name: "Microsoft Surface Pro 9",
    description: "2-in-1 tablet that replaces your laptop with Type Cover support and versatile kickstand.",
    price: 999,
    category: "tablets",
    brand: "Microsoft",
    stock: 41,
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    ],
    specifications: {
      processor: "Intel Core i5-1235U",
      ram: "8GB",
      storage: "256GB",
      screen: "13 inch PixelSense",
      camera: "10MP"
    },
    rating: 4.5,
    numReviews: 187
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "Premium Android tablet with stunning AMOLED display, IP68 rating, and included S Pen.",
    price: 799,
    category: "tablets",
    brand: "Samsung",
    stock: 56,
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    ],
    specifications: {
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "128GB",
      screen: "11 inch Dynamic AMOLED",
      camera: "13MP"
    },
    rating: 4.6,
    numReviews: 198
  },
  {
    name: "iPad Mini 6",
    description: "Compact powerhouse with A15 Bionic chip, 8.3-inch display, perfect for reading and portability.",
    price: 499,
    category: "tablets",
    brand: "Apple",
    stock: 62,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1"
    ],
    specifications: {
      processor: "Apple A15 Bionic",
      ram: "4GB",
      storage: "64GB",
      screen: "8.3 inch Liquid Retina",
      camera: "12MP"
    },
    rating: 4.5,
    numReviews: 287
  },
  {
    name: "Lenovo Tab P12 Pro",
    description: "Premium Android tablet with 12.6-inch AMOLED display and impressive quad speakers.",
    price: 699,
    category: "tablets",
    brand: "Lenovo",
    stock: 34,
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    ],
    specifications: {
      processor: "Snapdragon 870",
      ram: "8GB",
      storage: "256GB",
      screen: "12.6 inch AMOLED",
      camera: "13MP"
    },
    rating: 4.4,
    numReviews: 92
  },
  {
    name: "Amazon Fire HD 10",
    description: "Budget-friendly tablet perfect for media consumption, reading, and basic productivity tasks.",
    price: 149,
    category: "tablets",
    brand: "Amazon",
    stock: 127,
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f0a1",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    ],
    specifications: {
      processor: "Octa-core 2.0 GHz",
      ram: "3GB",
      storage: "32GB",
      screen: "10.1 inch Full HD",
      camera: "5MP"
    },
    rating: 4.2,
    numReviews: 1243
  },

  // Accessories (8 products)
  {
    name: "AirPods Pro 2nd Gen",
    description: "Premium wireless earbuds with active noise cancellation, adaptive transparency, and spatial audio.",
    price: 249,
    category: "accessories",
    brand: "Apple",
    stock: 156,
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
    ],
    specifications: {
      connectivity: "Bluetooth 5.3",
      battery: "6 hours (30 with case)",
      features: "ANC, Transparency Mode",
      waterproof: "IPX4"
    },
    rating: 4.8,
    numReviews: 892
  },
];

const seedProducts = async () => {
  try {
    // Remove existing products (optional, for fresh seed)
    await Product.deleteMany({});
    console.log('Existing products removed');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products inserted successfully`);

    // Close the connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
  }
};

// Run the seeding
seedProducts();