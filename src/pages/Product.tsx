import { Rating } from "@mui/material";
import { Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartStore from "../zustand/cartStore";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
};

type CartItems = {
  product: Product;
  quantity: number;
}[];

export const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const setCartItems = useCartStore((state) => state.setCartItems);
  const cartItems = useCartStore((state) => state.cartItems);

  const addToCart = () => {
    const existingItem = cartItems.find(
      (item) => item.product.id === Number(id)
    );

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.product.id === existingItem.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      if (product) {
        const updatedCartItems: CartItems = [
          ...cartItems,
          { product: product, quantity: 1 },
        ];
        setCartItems(updatedCartItems);
      } else {
        console.error("Product is undefined");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawdata = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await rawdata.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="p-4 grid grid-cols-3 gap-8">
        <Carousel className="h-60 col-span-1">
          {product?.images?.map((url) => (
            <img src={url} alt="" key={url} className="h-full rounded-lg" />
          ))}
        </Carousel>
        <div className="col-span-2">
          <h1 className="text-3xl font-medium mb-3">{product?.title}</h1>
          <p className="text-xl mb-4">
            ₹{product?.price}{" "}
            <span className="text-green-600 ml-4">
              {product?.discountPercentage}% OFF
            </span>
          </p>
          <Rating
            name="rating-read"
            value={product?.rating || 2.5}
            precision={0.5}
            readOnly
          />
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="block bg-green-700 mt-3 rounded-lg px-4 py-2 text-sm text-white  mb-8"
            >
              Add to Cart
            </button>
            <Link to={`/admin/product/edit/${id}`}>
              <button className="block bg-blue-700 mt-3 rounded-lg px-4 py-2 text-sm text-white  mb-8">
                Edit Product
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">{product?.description}</p>
        </div>
      </div>
    </>
  );
};
