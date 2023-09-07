import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawdata = await fetch(
          "https://dummyjson.com/products/category/smartphones"
        );
        const data = await rawdata.json();
        setProducts(data?.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4">
          {products.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="col-span-1 rounded-lg shadow p-3 min-h-full">
                <h1 className="text-base font-medium mb-2">{item.title}</h1>
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-28 h-28 m-auto my-4"
                />
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
