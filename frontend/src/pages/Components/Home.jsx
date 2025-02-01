import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SellingItems from '../SellingItems/SellingItems';
import UserOrders from './userOrders/userOrders';

const HomePage = () => {

    return (
        <div>
            <Navbar />
            <SellingItems />
            <UserOrders />

           
        </div>
    )
}

export default HomePage;