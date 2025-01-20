const express = require('express');
const router = express.Router();
let itemCategory = require('../models/itemCategory');
let item = require('../models/pcItems');


router.get('/', async (req, res) => {
    try {
        const itemCate = await itemCategory.find();
        res.status(200).send(itemCate);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.post('/AddItemCategory', async (req, res) => {
    try {
        const existingCategory = await itemCategory.findOne({ categoryName: req.body.categoryName });
        
        if (existingCategory) {
            return res.status(400).send({ message: "Category name already exists!" });
        }

        const newItemCategory = new itemCategory({
            categoryName: req.body.categoryName
        });

        await newItemCategory.save();
        res.status(200).send({ message: "Item Category Added Successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.put('/UpdateItemCategory/:id', async (req, res) => {
    let { id } = req.params;
    const { categoryName } = req.body;

    try {
        const existingCategory = await itemCategory.findById(id);

        if (!existingCategory) {
            return res.status(404).send({ message: "Category not found!" });
        }

        const duplicateCategory = await itemCategory.findOne({ categoryName });
        if (duplicateCategory && duplicateCategory._id.toString() !== id) {
            return res.status(400).send({ message: "Category name already exists!" });
        }

        const updatedItemCategory = await itemCategory.findByIdAndUpdate(
            id,
            { categoryName },
            { new: true }
        );

        // Update products using the old category name to the new one
        await item.updateMany(
            { itemCategory: existingCategory.categoryName }, // Query by old category name
            { $set: { itemCategory: categoryName } } // Update to new category name
        );

        res.status(200).send({
            message: "Item Category Updated Successfully!",
            itemCategory: updatedItemCategory,
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.delete('/DeleteItemCategory/:id', async (req, res) => {
    let itemCategoryID = req.params.id;

    try {
        const category = await itemCategory.findById(itemCategoryID);
        const productsUsingCategory = await item.find({ itemCategory: category.categoryName });

        if (productsUsingCategory.length > 0) {
            return res.status(400).send({
                message: `Cannot delete category "${category.categoryName}", it has ${productsUsingCategory.length} product(s).`,
            });
        }

        await itemCategory.findByIdAndDelete(itemCategoryID);
        res.status(200).send({ message: "Item Category Deleted Successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    let itemCategoryID = req.params.id;

    try {
        const itemCate = await itemCategory.findById(itemCategoryID);
        res.status(200).send(itemCate);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }

});

module.exports = router;

