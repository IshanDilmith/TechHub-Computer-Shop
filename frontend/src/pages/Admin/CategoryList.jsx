import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:3000/itemCategory/');
            setCategory(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCategory();

        const interval = setInterval(() => {
            fetchCategory();
        }, 100);

        return () =>
            clearInterval(interval);
    }, []);

    const deleteCategory = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this category?');
        if (confirm) {
            try {
                await axios.delete(`http://localhost:3000/itemCategory/DeleteItemCategory/${id}`);
                toast.success('Category deleted successfully!');
                fetchCategory();
            } catch (err) {
                if (err.response.status === 400) {
                    toast.error(err.response.data.message);
                }else{
                    toast.error('Failed to delete category!');
                }
            }

        }
    }

    return (
        <div>
            <Toaster />
            <div className="container">
                <h2>All Categories</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((cat) => (
                            <tr key={cat._id}>
                                <td>{cat.categoryName}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteCategory(cat._id)}>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/UpdateCategory/${cat._id}`}>
                                        <button className="btn btn-danger" >Update</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CategoryList;

