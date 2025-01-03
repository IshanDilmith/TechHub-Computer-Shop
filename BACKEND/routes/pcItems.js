const express = require('express');
const router = express.Router();
const { allItems, addItem, updateItem, deleteItem, getOneItem } = require('../controllers/pcItems');

router.get('/', allItems);
router.post('/AddItem', addItem);
router.put('/UpdateItem/:id', updateItem);
router.delete('/DeleteItem/:id', deleteItem);
router.get('/Item/:id', getOneItem);

module.exports = router;