import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../../pages/Components/UserContext';

const SellingItems = () => {
    const { dispatch } = useContext(UserContext);
    const { user } = useContext(UserContext);

    const [items, setItems] = useState([]);

    const fetchItems = async () => { 
        try {
            const response = await axios.get('http://localhost:3000/pcItems/');
            setItems(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchItems();

        const interval = setInterval(() => {
            fetchItems();
        }, 100);

        return () => 
            clearInterval(interval);
    }, []);

    return (
        <div>
            <Toaster />
            <div className="container">
                <h2>All Items</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Image</th>
                            <th>Item Price</th>
                            <th>Item Description</th>
                            <th>Item Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td><img src={`http://localhost:3000/PCItemImages/${item.itemImage}`} width="100" /></td>
                                <td>{item.itemPrice}</td>
                                <td>{item.itemDescription}</td>
                                <td>{item.itemStock}</td>
                                <td>
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            console.log("User object:", user);
                                            console.log("User ID:", user?.userId);
                                            dispatch({
                                                type: 'Add',
                                                item: { ...item, cartUsage: 1 },
                                                userId: user?.userId,
                                            });
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default SellingItems;