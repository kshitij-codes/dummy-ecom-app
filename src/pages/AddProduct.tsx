// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// type Product = {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
// };

// export const AddProduct = () => {
//   const location = useLocation();
//   const { id } = useParams();

//   const [images, setImages] = useState<string[]>([]);
//   const [input, setInput] = useState<Product>({
//     id: uuidv4(),
//     title: "",
//     description: "",
//     price: 0,
//     discountPercentage: 0,
//     rating: 0,
//     stock: 0,
//     brand: "",
//     category: "",
//     thumbnail: "...",
//     images: images,
//   });

//   const [formState, setFormState] = useState("add");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       let newImages = [...images];
//       for (let i = 0; i < e.target.files.length; i++) {
//         newImages.push(URL.createObjectURL(e.target.files[i]));
//       }
//       setImages(newImages);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formState === "add") {
//       addProduct(input);
//     } else if (formState === "edit") {
//       editProduct(input, id);
//     }
//     fetch("https://dummyjson.com/products/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(input),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         console.log;
//         navigate("/");
//       });
//   };

//   useEffect(() => {
//     if (location.pathname.startsWith("/admin/product/edit")) {
//       setFormState("edit");
//       const fetchData = async () => {
//         try {
//           const rawdata = await fetch(`https://dummyjson.com/products/${id}`);
//           const data = await rawdata.json();
//           setInput({
//             id: data.id,
//             title: data.title,
//             description: data.description,
//             price: data.price,
//             discountPercentage: data.discountPercentage,
//             rating: data.rating,
//             stock: data.stock,
//             brand: data.brand,
//             category: data.category,
//             thumbnail: data.thumbnail,
//             images: data.images,
//           });
//           setImages(data.images);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchData();
//     } else {
//       setFormState("add");
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="mx-24">
//         <div className="flex justify-between items-center mb-3">
//           <h1 className="text-2xl font-medium mb-2">
//             {formState === "add" ? "Add Product" : "Edit Product"}
//           </h1>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="title"
//             value={input.title}
//             className="rounded-lg w-full mb-2"
//             placeholder="Title"
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             value={input.description}
//             name="description"
//             className="rounded-lg w-full mb-2"
//             placeholder="Description"
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="price"
//             className="rounded-lg w-full mb-2"
//             placeholder="Price"
//             onChange={handleInputChange}
//             value={input.price}
//           />
//           <input
//             type="number"
//             name="discountPercentage"
//             placeholder="Discount Percentage"
//             className="rounded-lg w-full mb-2"
//             onChange={handleInputChange}
//             value={input.discountPercentage}
//           />
//           <input
//             type="number"
//             name="stock"
//             placeholder="Stock"
//             className="rounded-lg w-full mb-2"
//             onChange={handleInputChange}
//             value={input.stock}
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             className="rounded-lg w-full mb-2"
//             onChange={handleInputChange}
//             value={input.category}
//           />
//           <input
//             type="text"
//             name="brand"
//             placeholder="Brand"
//             className="rounded-lg w-full mb-2"
//             onChange={handleInputChange}
//             value={input.brand}
//           />
//           <input
//             type="file"
//             title="Choose image"
//             name="image"
//             accept="image/*"
//             placeholder="Image"
//             className="rounded-lg w-full mb-2"
//             multiple
//             onChange={handleImageChange}
//           />
//           <button
//             type="submit"
//             className="bg-green-600 text-white rounded-lg px-4 py-2 text-base"
//           >
//             {formState === "add" ? "Add Product" : "Save Changes"}
//           </button>
//         </form>
//         <div className="grid grid-cols-4 gap-4">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               className="col-span-1 w-full h-1/2 rounded-lg mb-2"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// function addProduct(input: Product) {
//   fetch("https://dummyjson.com/products/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(input),
//   })
//     .then((res) => res.json())
//     .then(() => console.log);
// }

// function editProduct(input: Product, id: string | undefined) {
//   fetch(`https://dummyjson.com/products/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(input),
//   })
//     .then((res) => res.json())
//     .then(console.log);
// }

import React, { Component } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

type Product = {
  id: string;
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

type State = {
  images: string[];
  input: Product;
  formState: string;
};

interface Props {
  params: { id?: string };
  location: { pathname: string };
  navigate: (path: string) => void;
}

class AddProduct extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Set initial state
    this.state = {
      images: [],
      input: {
        id: uuidv4(),
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        thumbnail: "...",
        images: [],
      },
      formState: "add",
    };
  }

  componentDidMount() {
    const { location, params } = this.props;

    if (location.pathname.startsWith("/admin/product/edit")) {
      this.setState({ formState: "edit" });

      const fetchData = async () => {
        try {
          const rawdata = await fetch(
            `https://dummyjson.com/products/${params.id}`
          );
          const data = await rawdata.json();

          this.setState({
            input: {
              id: data.id,
              title: data.title,
              description: data.description,
              price: data.price,
              discountPercentage: data.discountPercentage,
              rating: data.rating,
              stock: data.stock,
              brand: data.brand,
              category: data.category,
              thumbnail: data.thumbnail,
              images: data.images,
            },
            images: data.images,
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    } else {
      this.setState({ formState: "add" });
    }
  }

  render() {
    const { images, input, formState } = this.state;
    const { navigate, params } = this.props;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        let newImages = [...images];
        for (let i = 0; i < e.target.files.length; i++) {
          newImages.push(URL.createObjectURL(e.target.files[i]));
        }
        this.setState({ images: newImages });
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ input: { ...input, [e.target.name]: e.target.value } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formState === "add") {
        addProduct(input);
      } else if (formState === "edit") {
        editProduct(input, params.id);
      }
      fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((res) => res.json())
        .then(() => {
          console.log;
          navigate("/");
        });
    };

    return (
      <div className="p-6">
        <div className="mx-24">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-medium mb-2">
              {formState === "add" ? "Add Product" : "Edit Product"}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={input.title}
              className="rounded-lg w-full mb-2"
              placeholder="Title"
              onChange={handleInputChange}
            />
            <input
              type="text"
              value={input.description}
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
              value={input.price}
            />
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount Percentage"
              className="rounded-lg w-full mb-2"
              onChange={handleInputChange}
              value={input.discountPercentage}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="rounded-lg w-full mb-2"
              onChange={handleInputChange}
              value={input.stock}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="rounded-lg w-full mb-2"
              onChange={handleInputChange}
              value={input.category}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="rounded-lg w-full mb-2"
              onChange={handleInputChange}
              value={input.brand}
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
              {formState === "add" ? "Add Product" : "Save Changes"}
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
  }
}

export default (props: {}) => (
  <AddProduct
    {...props}
    params={useParams()}
    location={useLocation()}
    navigate={useNavigate()}
  />
);

function addProduct(input: Product) {
  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .then(() => console.log);
}

function editProduct(input: Product, id: string | undefined) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .then(console.log);
}
