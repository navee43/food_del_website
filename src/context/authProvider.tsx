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

// ✅ Context Type
export type CartContextType = {
  cartProducts: CartProduct[];
  addToCart: (product: Omit<CartProduct, "quantity">) => void; // caller doesn't pass quantity
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  removeCartProduct: (indexToRemove: number) => void;
  clearCart: () => void;
};

// ✅ Context
export const CartContext = createContext<CartContextType | null>(null);

// ✅ Provider
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

  // Remove cart product by index
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
      const numericPrice = Number(
        String(product.price).replace(/[^0-9.]/g, "")
      );

      const existingProductIndex = prevProducts.findIndex(
        (p) => p.id === product.id
      );

      let updatedCart: CartProduct[];

      if (existingProductIndex !== -1) {
        // ✅ Already in cart → increase quantity
        updatedCart = [...prevProducts];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        // ✅ New product → add with quantity 1
        updatedCart = [
          ...prevProducts,
          {
            ...product,
            price: numericPrice,
            quantity: 1,
          },
        ];
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
