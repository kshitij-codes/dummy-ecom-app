import { create } from "zustand";

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

type CartStoreState = {
  cartItems: CartItems;
  setCartItems: (cartItems: CartItems) => void;
};

const useCartStore = create<CartStoreState>((set) => {
  const initialCartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [];

  return {
    cartItems: initialCartItems,
    setCartItems: (cartItems: CartItems) => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      set({ cartItems });
    },
  };
});

export default useCartStore;
