const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } = require("../controllers/productController");
const formidable = require("express-formidable")

//router object
const router = express.Router();

//routes ============
//create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// get All products
router.get('/get-product', getProductController);

// get Single Product
router.get('/get-product/:slug', getSingleProductController);

//get Photo
router.get('/get-product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//filter product
router.post('/product-filters', productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get('/search/:keyword', searchProductController);

//similar products
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise prroduct
router.get('/product-category/:slug', productCategoryController);

//payments routes
//token
router.get('/braintree/token', braintreeTokenController);
//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

module.exports = router;