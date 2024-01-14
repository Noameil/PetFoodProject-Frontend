import React, { Children, useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Admin from "./routes/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditItem from "./routes/EditItem";
import AddItem from "./routes/AddItem";
import EditCategory from "./routes/EditCategory";
import AddCategory from "./routes/AddCategory";
import Cart from "./routes/Cart";
import AddSubCategory from "./routes/AddSubCategory";
import EditSubCategory from "./routes/EditSubCategory";
import AuthContext, { isAdmin } from "./contexts/AuthContext";
import useCategories from "./hooks/Category/useCategories";
import Checkout from "./routes/Checkout";


function App() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { categories } = useCategories();

  return (
    <div className="App">
      {/* {categories.map(category => <div key={category.categoryId}>  {category.categoryName}  </div>)}
      {Children.toArray(categories.map( category => <div>  {category.categoryName} </div>))} */}

      <Navbar />
      <Routes>
        {/* Not Logged In */}
        {/* {!isLoggedIn && <Route path="/" element={<Login />} />} */}
        <Route path="/" element={<Register />} />
        {/* {!isLoggedIn && <Route path="/login" element={<Login />} />} */}
        <Route path="/login" element={<Login />} />
        {/* {!isLoggedIn && <Route path="/register" element={<Register />} />} */}
        <Route path="/register" element={<Register />} />

        {/* Logged In */}
        {/* {isLoggedIn && <Route path="/home" element={<Home />} />} */}
        <Route path="/home" element={<Home />} />
        {/* {isLoggedIn && <Route path="/cart" element={<Cart />} />} */}
        <Route path="/cart" element={<Cart />} />
        {/* {isLoggedIn && <Route path="/checkout" element={<Checkout />} />} */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Logged In & Admin */}
        {/* {{isLoggedIn,  isAdmin} && <Route path="/admin" element={<Admin />} />} */}
        <Route path="/admin" element={<Admin />} />

        {/* {{isLoggedIn,  isAdmin} && <Route path="/edit-item/:id" element={<EditItem />} />} */}
        <Route path="/edit-item/:id" element={<EditItem />} />
        {/* {{isLoggedIn,  isAdmin} && <Route path="/add-item" element={<AddItem />} />} */}
        <Route path="/add-item" element={<AddItem />} />

        {/* {{isLoggedIn,  isAdmin} && <Route path="/edit-category/:id" element={<EditCategory />} />} */}
        <Route path="/edit-category/:id" element={<EditCategory />} />
        {/* {{isLoggedIn,  isAdmin} && <Route path="/add-category" element={<AddCategory />} />} */}
        <Route path="/add-category" element={<AddCategory />} />

        {/* {{isLoggedIn,  isAdmin} && <Route path="/edit-sub-category/:id" element={<EditSubCategory />} />} */}
        <Route path="/edit-sub-category/:id" element={<EditSubCategory />} />
        {/* {{isLoggedIn,  isAdmin} && <Route path="/add-sub-category" element={<AddSubCategory />} />} */}
        <Route path="/add-sub-category" element={<AddSubCategory />} />

        

        {/* for non-logged-in-users */}
        {/* {!isLoggedIn && <Route path="/register" element={<Register />} />} */}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* for logged-in users */}
        {/* {isLoggedIn && <Route path="/posts" element={<Posts />} />} */}

        {/* {isLoggedIn && <Route path="/posts/:id" element={<PostDetails />} />} */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}

export default App;
