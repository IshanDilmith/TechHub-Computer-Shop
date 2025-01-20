import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UpdateCategory = ({categoryId, currentName, onUpdate}) => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(currentName);

    const openModel = () => setIsModelOpen(true);
    const closeModel = () => setIsModelOpen(false);

    const updateCategory = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/ItemCategory/UpdateItemCategory/${categoryId}`, {categoryName : categoryName})
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Category Updated Successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                closeModel();
                onUpdate();
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
            <button className="btn btn-warning" onClick={openModel}>Edit</button>
            {isModelOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Update Category</h4>
                        <form onSubmit={updateCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="form-control"
                                required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" onClick={closeModel} className="btn btn-secondary">Cancel</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )

}

export default UpdateCategory;