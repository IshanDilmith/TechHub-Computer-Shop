import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from '../../Components/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const UserOrders = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext);
    const userId = user?.userId;

    useEffect(() => {
        axios.get(`http://localhost:3000/order/${userId}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <div>
            <h1>Orders</h1>
            {orders.length === 0 ? (
                <h2>No orders found</h2>
            ) : (
                
                    <div>
                        {orders.map((order) => (
                            <div key={order._id}>
                                
                                <Link to={`/order/${order._id}`}>
                                {order.products.map((product, index) => (
                                    <div key={index}>
                                        <p>{product.itemName}</p>
                                    </div>
                                ))}
                                <h3>Total Price: {order.totalPrice}</h3>
                                <h3>Status: {order.status}</h3>
                                </Link>
                            </div>
                            
                        ))}
                    </div>
            )}
            
        </div>
    );
}

export default UserOrders;