import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ItemCategory = () => {
    
    const [categoryName, setCategoryName] = useState('');

    const addCategory = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/itemCategory/AddItemCategory', { categoryName })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Category Added Successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                if(err.response.status === 500){
                    toast.error('Server Error');
                } else if(err.response.status === 400){
                    toast.error('Category name already exists!');
                } else {
                    toast.error('Failed to add Category try again!!');
                }
            })

    }

    return (
        <div>
            <Toaster />

            <div className="container">
                <form onSubmit={addCategory} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" className="form-control" 
                        onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <button className="btn btn-primary">Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default ItemCategory;