import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const AddItem = () => {

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCategory, setItemCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [itemStock, setItemStock] = useState('');
    const [itemImage, setItemImage] = useState(null);

    useEffect(() => { 
        axios.get('http://localhost:3000/itemCategory/')
            .then((res) => {
                setItemCategory(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const selectedCategoryObj = itemCategory.find(cat => cat.categoryName === selectedCategory);
        setSelectedCategory(selectedCategoryObj ? selectedCategoryObj.categoryName : '');
    }
    

    const addItem = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
        formData.append('itemDescription', itemDescription);
        formData.append('itemCategory', selectedCategory);
        formData.append('itemStock', itemStock);
        formData.append('itemImage', itemImage);

        axios.post('http://localhost:3000/pcItems/AddItem', formData)
            .then(() => {
                toast.success('Item Added Successfully!!');

            })
            .catch(err => {
                if(err.response.status === 500){
                    toast.error('Server Error');
                } else {
                    toast.error('Failed to add Item try again!!');
                }
            })

    }

    return (
        <div>
            <Toaster />

            <div className="container">
                <form onSubmit={addItem} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text" className="form-control" 
                        onChange={(e) => setItemName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Item Price</label>
                        <input type="number" className="form-control" 
                        onChange={(e) => setItemPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Item Description</label>
                        <input type="text" className="form-control" 
                        onChange={(e) => setItemDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Item Category</label>
                        <select className="form-control"
                            value={selectedCategory}
                            onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            {itemCategory.map((category) => (
                                <option key={category._id} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Item Stock</label>
                        <input type="number" className="form-control" 
                        onChange={(e) => setItemStock(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Item Image</label>
                        <input type="file" className="form-control" 
                        onChange={(e) => setItemImage(e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Item</button>
                </form>
            </div>
        </div>
    )


}
export default AddItem;