import React, { useEffect } from 'react';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';
import { totalItems } from '../Components/CartReducer';
import { totalPrice } from '../Components/CartReducer';
import { loadCartFromSessionStorage } from '../Components/CartReducer';
import Navbar from '../Components/Navbar/Navbar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, dispatch, user } = useContext(UserContext);
    const userId = user?.userId;

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

    const handleCheckout = async () => {
        try {
            Swal.fire({
                title: "Are you sure you want to place the order?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, place it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch('http://localhost:3000/order/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
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
                }});
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to place order');
        }
    };



    return (
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
                    <h5>Total Items:{totalItems(cart)}</h5>
                    <h5>Total Price:{totalPrice(cart)}</h5>
                    <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                        onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
