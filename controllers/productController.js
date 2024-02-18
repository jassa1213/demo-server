const Product = require("../models/productModels");

const addProduct = async (req, res) => {
  try {
    const {
      image,
      productName,
      productDescription,
      marketPrice,
      offerPrice,
      rating,
      manufacturerAddress,
      size,
      productDetails,
      category,
      username,
    } = req.body;

    // Create a new product document
    const newProduct = new Product({
      image,
      productName,
      productDescription,
      marketPrice,
      offerPrice,
      rating,
      category,
      manufacturerAddress,
      size,
      productDetails,
      category,
      username,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const _id = req.params.productId; 
    const {
      image,
      productName,
      productDescription,
      marketPrice,
      offerPrice,
      rating,
      manufacturerAddress,
      size,
      productDetails,
      category,
      username,
    } = req.body;

    // Find the product by its ID
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product properties
    product.image = image;
    product.productName = productName;
    product.productDescription = productDescription;
    product.marketPrice = marketPrice;
    product.offerPrice = offerPrice;
    product.rating = rating;
    product.manufacturerAddress = manufacturerAddress;
    product.size = size;
    product.category = category;
    product.productDetails = productDetails;
    product.username = username;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming you pass the product ID in the URL

    // Find the product by its ID and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product removed successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const sellerUsername = req.params.sellerUsername;

    // Query the database for products by seller username
    const products = await Product.find({ username: sellerUsername });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for this seller." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller function for getting products by category
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found in category: ${category}` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Query the database for products by seller username
    const products = await Product.findOne({ _id: productId });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for this seller." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for this seller." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  editProduct,
  removeProduct,
  getProducts,
  getProductById,
  getAllProducts,
  getProductsByCategory
};
