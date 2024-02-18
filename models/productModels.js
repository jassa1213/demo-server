const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  marketPrice: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  manufacturerAddress: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: false,
  },
  productDetails: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default:1
  },
  username: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
