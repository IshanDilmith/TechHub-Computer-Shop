import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UpdateOrderStatus = ({orderId, currentStatus, onUpdate}) => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [status, setStatus] = useState(currentStatus);

    const openModel = () => setIsModelOpen(true);
    const closeModel = () => setIsModelOpen(false);

    const UpdateOrderStatus = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/order/updateStatus/${orderId}`, {status : status})
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order Status Updated Successfully!!",
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
                    toast.error('Failed to update Order Status try again!!');
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
                        <h4>Update Order Status</h4>
                        <form onSubmit={UpdateOrderStatus}>
                            <div className="form-group">
                                <label>Order Status</label>
                                <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-control"
                                required
                                />
                                <button type="submit" className="btn btn-success mt-2">Update</button>
                                <button className="btn btn-danger mt-2" onClick={closeModel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateOrderStatus;