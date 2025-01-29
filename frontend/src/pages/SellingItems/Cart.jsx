import React, { useEffect, useState, useRef } from 'react';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';
import { totalItems } from '../Components/CartReducer';
import { totalPrice } from '../Components/CartReducer';
import { loadCartFromSessionStorage } from '../Components/CartReducer';
import Navbar from '../Components/Navbar/Navbar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import PaymentGateway from './paymentGateway';

const Cart = () => {
    const { cart, dispatch, user } = useContext(UserContext);
    const paymentGatewayRef = useRef(null)
    const userId = user?.userId;

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        deliveryAddress: '',
        comments: '',
        userId: userId,
    });
    
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (userId && cart.length === 0) {
            const savedCart = loadCartFromSessionStorage(userId);
            if (savedCart.length > 0) {
                savedCart.forEach(item => {
                    dispatch({
                        type: 'Add',
                        item,
                        userId,
                    });
                });
            }
        }
    }, [userId, cart.length, dispatch]);

    const Increase = (id) => {
        const index = cart.findIndex((item) => item._id === id);
        if(cart[index].cartUsage < cart[index].itemStock) {
            dispatch({
                type: 'Increase',
                payload: id,
                userId,
            });
        }

    };

    const Decrease = (id) => {
        const index = cart.findIndex((item) => item._id === id);
        if(cart[index].cartUsage > 1) {
            dispatch({
                type: 'Decrease',
                payload: id,
                userId,
            });
        }
    };

    const handleCheckout = async (e) => {
        try {
            e.preventDefault();
            console.log('Form Data:', formData);
            Swal.fire({
                title: "Are you sure you want to place the order?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, place it!"
              }).then(async (result) => {
                if(result.isConfirmed) {
                    setTotalAmount(totalPrice(cart));
                    setOrderConfirmed(true);
                    const response = await axios.post('http://localhost:3000/payment/', formData);
                    console.log(response.data);
                    setPaymentInitiated(true);

                    if (paymentGatewayRef.current) {
                        await paymentGatewayRef.current.initiatePayment();
                    } else {
                        console.error("Payment gateway is not available.");
                    }
                }
                    
                });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to place order');
        }
    };

    const storeOrder = async () => {
        const response = await fetch('http://localhost:3000/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                userName: user?.firstName + ' ' + user?.lastName,
                email: user?.email,
                phone : formData.phone,
                deliveryAddress: formData.deliveryAddress,
                comments: formData.comments,
                products: cart.map((item) => ({
                    itemName: item.itemName,
                    itemQuantity: item.cartUsage,
                })),
                total: totalPrice(cart),
            }),
        });

        if (response.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Order Placed Successfully!!",
                showConfirmButton: false,
                timer: 1500
            });

            dispatch({
                type: 'Clear',
                userId,
            });

        } else {
            toast.error('Failed to place order');
        }
    };

    useEffect(() => {
        if (paymentInitiated && orderConfirmed) {
            storeOrder();
        }
    }, [paymentInitiated, orderConfirmed]);



    return (
        <div>
            <Toaster />

            <div>
                <Navbar />
                <div className="flex flex-wrap gap-6 p-4">
                    {cart.map((item) => (
                        <div 
                            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64" 
                            key={item._id}
                        >
                            <img 
                                src={`http://localhost:3000/PCItemImages/${item.itemImage}`} 
                                alt={item.itemName || "Item Image"} 
                                className="w-24 h-24 object-cover mb-4 rounded-md"
                            />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.itemName}</h4>
                            <h4 className="text-gray-600 text-sm mb-4">${item.itemPrice}</h4>
                            <div className="flex items-center gap-2 mb-4">
                                <button className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                                    onClick={() => {Decrease(item._id)}}
                                >
                                    -
                                </button>
                                <h4 className="text-lg font-semibold">{item.cartUsage}</h4>
                                <button className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                                    onClick={() => {Increase(item._id)}
                                }>
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: 'Remove',
                                        payload: item._id,
                                        userId,
                                    });
                                }}
                                className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div>
                        <form onSubmit={handleCheckout}> 
                            <div>
                                <label>First Name : {user?.firstName} {user?.lastName}</label>
                            </div>

                            <div>
                                <label>email : {user?.email} </label>
                            </div>

                            <div>
                                <label>Phone Number : </label>
                                <input type="text" 
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                required/>
                            </div>

                            <div>
                                <label>Delivery Address : </label>
                                <input type="text" 
                                    name='deliveryAddress'
                                    value={formData.deliveryAddress}
                                    onChange={handleChange}
                                required/>
                            </div>

                            <div>
                                <label>comments : </label>
                                <textarea 
                                    name='comments'
                                    value={formData.comments}
                                    onChange={handleChange}
                                />
                            </div>

                            <h5>Total Items:{totalItems(cart)}</h5>
                            <h5>Total Price:{totalPrice(cart)}</h5>
                            <button 
                                type='submit' 
                                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                                    Checkout
                            </button>
                            
                        </form>
                    </div>
                </div>
                {paymentInitiated && (
                        <PaymentGateway ref={paymentGatewayRef} amount={totalAmount} />
                    )}
            </div>
        </div>
    );
};

export default Cart;