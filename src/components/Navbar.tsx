import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../zustand/cartStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);

  const [keyword, setKeyword] = useState("");

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const handleSearchClick = () => {
    if (keyword !== "") {
      navigate(`/search/${keyword}`);
    }
  };

  useEffect(() => {
    let debounceTimer: number | undefined;
    if (keyword !== "") {
      debounceTimer = setTimeout(() => {
        navigate(`/search/${keyword}`);
      }, 600);
    }

    return () => clearTimeout(debounceTimer);
  }, [keyword]);

  return (
    <div className="w-full py-2 px-8 bg-gray-200 flex justify-between items-center shadow">
      <Link to={"/"}>
        <h1 className="font-medium text-xl">Tech Shop</h1>
      </Link>
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="rounded-lg"
          placeholder="Search Product"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button
          onClick={handleSearchClick}
          className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
      <div>
        <Link to={"/cart"}>
          <button className="bg-yellow-500 mr-4 text-white text-sm px-4 py-2 rounded-lg">
            Cart ({cartItems.length})
          </button>
        </Link>
        <Link to={"/admin/product/add"}>
          <button className="bg-gray-700 text-white text-sm px-4 py-2 rounded-lg">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
};
