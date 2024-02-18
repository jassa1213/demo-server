const express = require("express");
const isSeller = require("../middleware/isSellerMiddleware");
const {
  addProduct,
  editProduct,
  removeProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  getAllProducts,
} = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add-product", addProduct);
router.get("/get-products", getAllProducts);
router.get('/get-products/:category', getProductsByCategory);
router.get("/get-products/:sellerUsername", getProducts);
router.get("/get-product/:productId", getProductById);
router.put("/edit-product/:productId", editProduct);
router.delete("/remove-product/:productId", removeProduct);
module.exports = router;
