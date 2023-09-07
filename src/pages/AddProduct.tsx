import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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
  thumbnail: string;
  images: string[];
};

export const AddProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [input, setInput] = useState<Product>({
    id: 31,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "...",
    images: images,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newImages = [...images];
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(URL.createObjectURL(e.target.files[i]));
      }
      setImages(newImages);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then(console.log);
    // .then((result) => {
    //   navigate("/");
    //   toast.success(result, {
    //     position: "top-center",
    //     autoClose: 3000,
    //   });
    // });
  };

  return (
    <div className="p-6">
      <div className="mx-24">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-medium mb-2">Add Product</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="rounded-lg w-full mb-2"
            placeholder="Title"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            className="rounded-lg w-full mb-2"
            placeholder="Description"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            className="rounded-lg w-full mb-2"
            placeholder="Price"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage"
            className="rounded-lg w-full mb-2"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="rounded-lg w-full mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="rounded-lg w-full mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            className="rounded-lg w-full mb-2"
            onChange={handleInputChange}
          />
          <input
            type="file"
            title="Choose image"
            name="image"
            accept="image/*"
            placeholder="Image"
            className="rounded-lg w-full mb-2"
            multiple
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg px-4 py-2 text-base"
          >
            Add
          </button>
        </form>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="col-span-1 w-full h-1/2 rounded-lg mb-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
