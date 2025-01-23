import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../../pages/Components/UserContext';

const SellingItems = () => {
    const { dispatch } = useContext(UserContext);
    const { user } = useContext(UserContext);

    const [items, setItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const filtered = items.filter((item) => 
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        setFilteredItems(filtered);
    
    }, [searchQuery, items]);
    


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
            
            <form className="max-w-md mx-auto">   
                <label>Search</label>
                <div className="relative">
                    <input type="search" placeholder="Search Items"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required />
                </div>
            </form>

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
                        {filteredItems.length > 0 ? filteredItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td><img src={`http://localhost:3000/PCItemImages/${item.itemImage}`} width="100" /></td>
                                <td>{item.itemPrice}</td>
                                <td>{item.itemDescription}</td>
                                <td>{item.itemStock}</td>
                                <td>
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            if(user === null) {
                                                toast.error('Please login to add items to cart');
                                                return;
                                            }
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
                        )) :
                        <tr>
                            <td colSpan="6" className="text-center">No items found</td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default SellingItems;