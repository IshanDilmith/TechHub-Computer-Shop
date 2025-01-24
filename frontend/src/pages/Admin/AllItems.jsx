import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AllItems = () => {
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
        const interval = setInterval(() => {
            fetchItems();
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const deleteItem = async (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this Item?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/pcItems/DeleteItem/${id}`);
                await fetchItems();
              Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
            }
          }).catch((err) => {
            console.log(err);
          });
    };

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
                            <th>Item Category</th>
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
                                <td>{item.itemCategory}</td>
                                <td>{item.itemStock}</td>
                                <td>
                                    <Link to= {`/UpdateItem/${item._id}`} state={{ ItemToEdit : item }} >
                                        <button className="btn btn-danger">Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteItem(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default AllItems;