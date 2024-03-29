/* eslint-disable no-empty */
/* eslint-disable indent */
const categoryModel = require('../models/categoryModel')
const slugify = require('slugify');
const { trace } = require('../routes/categoryRoutes');

const createCategoryController = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ error: "Name is required" })
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(200).send({
            success: true,
            message: "New category created",
            category
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        })
    }
};

//update category
const updateCategoryController = async(req, res) => {

    try {
        const { name } = req.body
        const id = req.params.id
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category Updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        });
    }
}


// Get all categories
const categoryController = async(req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All categories List",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        });
    }
}


//single category 
const singleCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        });
    }
}

//delete category
const deleteCategoryController = async(req, res) => {
    try {
        const id = req.params.id;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Deleted category successfully",

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        });
    }
}

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController };