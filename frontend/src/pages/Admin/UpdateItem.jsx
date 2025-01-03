import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate  } from 'react-router-dom';

const UpdateItem = () => {
    const {id} = useParams();
    const [itemCategory, setItemCategory] = useState([]);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        itemName: '',
        itemPrice: 0,
        itemDescription: '',
        itemCategory: '',
        itemStock: 0,
        itemImage: ''
    });

    useEffect(() => { 
        axios.get('http://localhost:3000/itemCategory/')
            .then((res) => {
                setItemCategory(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3000/pcItems/Item/${id}`)
            .then((res) => {
                const itemData = res.data;

                setValues({
                    itemName: itemData.itemName,
                    itemPrice: itemData.itemPrice,
                    itemDescription: itemData.itemDescription,
                    itemCategory: itemData.itemCategory,
                    itemStock: itemData.itemStock,
                    itemImage: itemData.itemImage
                });
            }).catch((err) => {
                console.log(err);
            })
    }, [id]);

    const updateItem = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('itemName', values.itemName);
        formData.append('itemPrice', values.itemPrice);
        formData.append('itemDescription', values.itemDescription);
        formData.append('itemCategory', values.itemCategory);
        formData.append('itemStock', values.itemStock);
        formData.append('itemImage', values.itemImage);
        

        axios.put(`http://localhost:3000/pcItems/UpdateItem/${id}`, formData)
            .then(() => {
                toast.success('Item Updated Successfully!!');

                navigate('/Items');

            })
            .catch(err => {
                if(err.response.status === 500){
                    toast.error('Server Error');
                } else {
                    toast.error('Failed to update Item try again!!');
                }
            })

    }

    return (
        <div>
            <Toaster />

            <div className="container">
                <form onSubmit={updateItem} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text" className="form-control" 
                        value={values.itemName} 
                        onChange={(e) => setValues({...values, itemName: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>Item Price</label>
                        <input type="number" className="form-control"
                        min={0}
                        value={values.itemPrice}
                        onChange={(e) => setValues({...values, itemPrice: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>Item Description</label>
                        <input type="text" className="form-control" 
                        value={values.itemDescription} 
                        onChange={(e) => setValues({...values, itemDescription: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>Item Category</label>
                        <select className="form-control"
                            value={values.itemCategory}
                            onChange={(e) => setValues({...values, itemCategory: e.target.value})} required>
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
                        min={0} 
                        value={values.itemStock} 
                        onChange={(e) => setValues({...values, itemStock: e.target.value})} required/>
                    </div>
                    <div className="form-group">
                        <label>Current Image</label>
                        <img src={`http://localhost:3000/PCItemImages/${values.itemImage}`} width="100" />
                    </div>
                    <div className="form-group">
                        <label>Update Image</label>
                        <input type="file" className="form-control" 
                        onChange={(e) => setValues({...values, itemImage: e.target.files[0]})} />   
                    </div>
                    <button className="btn btn-primary">Update Item</button>
                </form>
            </div>
        </div>
    )


}
export default UpdateItem;