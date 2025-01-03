const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const router = express.Router();
let pcItems = require('../models/pcItems');
const app = express();

function deleteImage(filePath) {
    fs.unlink(path.join(__dirname, '..', 'PCItemImages', filePath), (err) => {
        if (err) {
            console.error('Failed to delete the file:', err);
        }
    });
}

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./PCItemImages");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() +"_" + file.originalname);
    } 
});

var upload = multer({ storage: storage }).single("itemImage");


const addItem = router.post('/AddItem',upload, async (req, res) => {
    try {
        const newItem = new pcItems({
            itemName: req.body.itemName,
            itemPrice: Number(req.body.itemPrice),
            itemDescription: req.body.itemDescription,
            itemCategory: req.body.itemCategory,
            itemImage: req.file.filename,
            itemStock: Number(req.body.itemStock)
        });
        await newItem.save();
        res.status(200).send(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error", error: err.message });
    }
});


const updateItem = router.put('/UpdateItem/:id', upload, async (req, res) => {
    let id = req.params.id;
    const {itemName, itemPrice, itemDescription, itemCategory, itemStock} = req.body;
    const itemImage = req.file ? req.file.filename : req.body.pImage;

    const updateItem = {
        itemName,
        itemPrice : Number(itemPrice),
        itemDescription,
        itemCategory,
        itemImage,
        itemStock : Number(itemStock)
    };

    try {
        const itemData = await pcItems.findById(id);

        //check if the new image exists
        if (req.file) {
            if (itemData.itemImage) {
                deleteImage(itemData.itemImage); 
            }
        }
        
        const updatedItem = await pcItems.findByIdAndUpdate(id, updateItem, {new: true});
        res.status(200).send({message: "Item Updated Successfully!", item: updatedItem});
    } catch(err){
        console.error(err);
        res.status(500).send({message: "Server Error", error: err.message});
    }

});

const deleteItem = router.delete('/DeleteItem/:id', async (req, res) => {
    let itemID = req.params.id;

    try {
        const ItemToDelete = await pcItems.findById(itemID);

        if (!ItemToDelete) {
            return res.status(404).send({ status: "Package not found!" });
        }

        if (ItemToDelete.itemImage) {
            deleteImage(ItemToDelete.itemImage);
        }

        await pcItems.findByIdAndDelete(itemID);
        res.status(200).send({ status: "Package deleted!" });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting package", error: err.message });
    }
});

const getOneItem = router.get('/Item/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const fetchItem = await pcItems.findById(id);

        if(!fetchItem){
            res.status(404).send({message: "Item not found"});
        } else {
            res.status(200).send(fetchItem);
        }
    } catch(err){
        console.error(err);
        res.status(500).send({message: "Server Error", error: err.message});
    }
});

const allItems = router.get('/', async (req, res) => {
    try {
        const items = await pcItems.find();
        res.status(200).send(items);
    } catch(err){
        console.error(err);
        res.status(500).send({message: "Server Error", error: err.message});
    }
});

module.exports = { allItems, addItem, updateItem, deleteItem, getOneItem };
