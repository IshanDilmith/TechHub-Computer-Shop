import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddItem from "../pages/Admin/AddItem";
import ItemCategory from "../pages/Admin/ItemCategory";
import AllItems from "../pages/Admin/AllItems";
import UpdateItem from "../pages/Admin/UpdateItem";
import CategoryList from "../pages/Admin/CategoryList";
import SignUp from "../pages/User/signUp";
import LogIn from "../pages/User/Login";
import HomePage from "../pages/Components/Home";
import UpdateCategory from "../pages/Admin/UpdateCategory";
import ProtectedRoute from "../pages/Components/ProtectedRoute";
import Cart from "../pages/SellingItems/Cart";
import ContactUs from "../pages/ContactUs/ContactUs";

function AppRoutes() {
    return (
        <Router>
            <Routes>

                <Route path="/Items" element={<AllItems />} />
                <Route path="/AddItem" element={<ProtectedRoute adminOnly> <AddItem /> </ProtectedRoute>  } />
                <Route path="/UpdateItem/:id" element={<UpdateItem />} />

                <Route path="/AddCategory" element={<ItemCategory />} />
                <Route path="/Categories" element={<CategoryList />} />
                <Route path="/UpdateCategory/:id" element={<UpdateCategory />} />

                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/contactUs" element={<ContactUs />} />


            </Routes>
        </Router>
    );
}
export default AppRoutes;