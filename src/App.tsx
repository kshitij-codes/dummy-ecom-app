import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Product } from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searched from "./pages/Searched";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/admin/product/add" element={<AddProduct />} />
            <Route path="/admin/product/edit/:id" element={<AddProduct />} />
            <Route path="/search/:keyword" element={<Searched />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
