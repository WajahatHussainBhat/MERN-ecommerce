const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/categoryController");

//router object
const router = express.Router();

//Create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//Update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get All categories
router.get('/get-category', categoryController);

//get single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;