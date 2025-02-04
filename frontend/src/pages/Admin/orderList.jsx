import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import UpdateOrderStatus from './updateOrderStatus';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/order/allOrders');
            setOrders(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div>
            <Toaster />
            <div className="container">
                <h2>All Orders</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item Name</th>
                            <th>Total Price</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer Address</th>
                            <th>Customer Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    { order.products.map((product, index) => (
                                        <div key={index}>
                                            <p>{product.itemName} x {product.itemQuantity}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.userName}</td>
                                <td>{order.email}</td>
                                <td>{order.deliveryAddress}</td>
                                <td>{order.phone}</td>
                                <td>{order.status}</td>
                                <td>
                                    <UpdateOrderStatus
                                        orderId={order._id}
                                        currentStatus={order.status}
                                        onUpdate={fetchOrders}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderList;