import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SellingItems from '../SellingItems/SellingItems';

const HomePage = () => {

    return (
        <div>
            <Navbar />
            <SellingItems />
           
        </div>
    )
}

export default HomePage;