import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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

const Searched = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawdata = await fetch(
          `https://dummyjson.com/products/search?q=${keyword}`
        );
        const data = await rawdata.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <>
      <div className="p-8">
        {products?.length !== 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {products?.map((item) => (
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
        ) : (
          <div>
            <h1>No Products found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Searched;
