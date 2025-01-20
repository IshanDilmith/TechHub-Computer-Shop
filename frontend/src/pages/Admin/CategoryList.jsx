import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import UpdateCategory from './UpdateCategory';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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

    }, [category]);

    const deleteCategory = async (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this category?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/itemCategory/DeleteItemCategory/${id}`);
                await fetchCategory();
              Swal.fire({
                title: "Deleted!",
                text: "Category has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
            }
          }).catch((err) => {
            if (err.response.status === 400) {
                toast.error(err.response.data.message);
            }else{
                toast.error('Failed to delete category!');
            }
          });
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
                                    <UpdateCategory
                                        categoryId={cat._id}
                                        currentName={cat.categoryName}
                                        onUpdate={fetchCategory}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteCategory(cat._id)}>Delete</button>
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

