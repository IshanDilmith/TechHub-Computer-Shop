import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate  } from 'react-router-dom';

const UpdateCategory = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/ItemCategory/${id}`)
            .then((res) => {
                const categoryData = res.data;

                setCategoryName(categoryData.categoryName);
            }).catch((err) => {
                console.log(err);
            })
    }, [id]);

    const updateCategory = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/ItemCategory/UpdateItemCategory/${id}`, {categoryName})
            .then(() => {
                toast.success('Category Updated Successfully!!');
                navigate('/Categories');

            })
            .catch(err => {
                if(err.response.status === 500){
                    toast.error('Server Error');
                } else if(err.response.status === 400){
                    toast.error(err.response.data.message);
                } else {
                    toast.error('Failed to update Category try again!!');
                }
            })

    }

    return (
        <div>
            <Toaster />
            <div className="container">
                <h2>Update Category</h2>

                <form onSubmit={updateCategory}>
                    <div className="form-group">
                        <label >Category Name</label>
                        <input type="text" className="form-control"
                        value = {categoryName} 
                        onChange={ (e) => setCategoryName(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    )

}

export default UpdateCategory;