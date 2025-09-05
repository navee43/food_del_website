"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, ReactNode, useEffect } from "react";


export type CartProduct = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number; // Always managed in cart
};


export type CartContextType = {
  cartProducts: CartProduct[];
  addToCart: (product: Omit<CartProduct, "quantity">) => void; 
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  removeCartProduct: (indexToRemove: number) => void;
  clearCart: () => void;
};


export const CartContext = createContext<CartContextType | undefined>(undefined);



export default function AuthProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const ls =
    typeof window !== "undefined" ? window.localStorage : null;

  // Load cart from localStorage on mount
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") ?? "[]"));
    }
  }, []);

  // Save to localStorage
  function saveCartProductsToLocalStorage(cartProducts: CartProduct[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  // Clear cart
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }


  function removeCartProduct(indexToRemove: number) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (_, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  // Add product to cart
function addToCart(product: Omit<CartProduct, "quantity">) {
  setCartProducts((prevProducts) => {
    const existingProductIndex = prevProducts.findIndex((p) => p.id === product.id);

    let updatedCart: CartProduct[];

    if (existingProductIndex !== -1) {
      updatedCart = [...prevProducts];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart = [...prevProducts, { ...product, quantity: 1 }]; // ✅ quantity added here
    }

    saveCartProductsToLocalStorage(updatedCart);
    return updatedCart;
  });
}



  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
