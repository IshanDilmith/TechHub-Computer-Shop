import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserOrders = () => {
    const [order, setOrder] = useState({});
    const { orderId } = useParams();

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/order/order/${orderId}`);
            setOrder(response.data);

        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    return (
        <div>
            <h1>order details</h1>
            <p>Name : {order.userName}</p>
            <p>Email : {order.email}</p>
            <p>Phone : {order.phone}</p>
            <p>Delivery Address : {order.deliveryAddress}</p>
            {order.comments && <p>Comments : {order.comments}</p>}
            <h2>Products</h2>
            {order.products.map((product, index) => (
                <div key={index}>
                    <p>{product.itemName}</p>
                    <p>Item Name : {product.itemName}</p>
                    <p>Item Quantity : {product.itemQuantity}</p>
                </div>
            ))}
            <h3>Total Price : {order.totalPrice}</h3>
            <h3>Status : {order.status}</h3>

        </div>
    );
}

export default UserOrders;