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
            
            <form className="max-w-md mx-auto" >

                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        value={searchQuery}
                        placeholder="Search by name..." 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
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