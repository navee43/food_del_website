'use client'

import { SessionProvider } from "next-auth/react"
import { createContext, useState, ReactNode, useEffect } from "react"

type CartProduct = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
};

type CartContextType = {
  cartProducts: CartProduct[];
  addToCart: (product: CartProduct) => void;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  removeCartProduct: (indexToRemove: number) => void;  
  clearCart: () => void; 
};

export const CartContext = createContext<CartContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage :null

  useEffect(()=>{
    if(ls && ls.getItem('cart')){
      setCartProducts(JSON.parse(ls.getItem('cart')?? '[]'));
    }
  },[])
  function saveCartProductsToLocalStorage (cartProducts:CartProduct[]){
    if(ls){
      ls.setItem('cart',JSON.stringify(cartProducts)) 
    }
    
  }
  
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove:any) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts
        .filter((v,index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
   
  }


function addToCart(product: any) {
  setCartProducts((prevProducts: any[]) => {
    const numericPrice = Number(
      String(product.price).replace(/[^0-9.]/g, "")
    );

    const existingProductIndex = prevProducts.findIndex(
      (p) => p.id === product.id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      // ✅ If already in cart → increase quantity
      updatedCart = [...prevProducts];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // ✅ Else → add new product with quantity 1
      updatedCart = [
        ...prevProducts,
        {
          ...product,
          price: numericPrice,
          quantity: 1,
        },
      ];
    }

    // ✅ Save to localStorage
    saveCartProductsToLocalStorage(updatedCart);

    return updatedCart;
  });
}



  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart , removeCartProduct, clearCart}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
