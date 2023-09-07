import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="w-full py-2 px-8 bg-gray-200 flex justify-between items-center shadow">
      <h1 className="font-medium text-xl">Tech Shop</h1>
      <Link to={"/admin/product/add"}>
        <button className="bg-gray-700 text-white text-sm px-4 py-2 rounded-lg">
          Add Product
        </button>
      </Link>
    </div>
  );
};
