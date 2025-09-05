"use client";

import { CartContext } from "@/context/authProvider";
import React, { useContext } from "react";
import Image from "next/image";
import Script from "next/script";
import axios from "axios";
import { toast } from "sonner";
import { X , CheckCircle2 } from 'lucide-react';

function Cart() {
  const { cartProducts, removeCartProduct ,setCartProducts,clearCart }: any = useContext(CartContext);
 
console.log("Cart Products:", cartProducts);
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};



function increaseQuantity(index: number) {
  setCartProducts((prev: any[]) => {
    const updated = [...prev];
    updated[index].quantity += 1;

    return updated;
  });
}

function decreaseQuantity(index: number) {
  setCartProducts((prev: any[]) => {
    const updated = [...prev];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }
    
    return updated;
  });
}


  const total = cartProducts.reduce(
    (sum: number, p: any) => sum + p.price * p.quantity,
    0
  );


   const handlePayment = async () => {
    // Call backend to create order
    const res = await axios.post('/api/razorpay', {amount:total})
    const data = await res.data;

    if (!data.orderId) {
       toast("something went wrong", {
            description: "error while creating your order",
            icon: <X className="text-white" />,
            style: {
              background:
               "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 60%, #f5f5dc 100%)"

               ,


              color: "white",
              borderRadius: "1rem", // rounded-xl
              boxShadow:
                "0 8px 16px rgba(99, 102, 241, 0.5), 0 4px 6px rgba(139, 92, 246, 0.4)", 
              padding: "1rem 1.25rem",
              fontWeight: "600",
              fontSize: "1rem",
              // border:"10px",
              gap:"1rem"
            },
            className: "backdrop-blur-md", 
          })
    }

    const options:RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: total * 100,
      currency: "INR",
      name: "Food Ordering Website",
      description: "Order Payment",
      order_id: data.orderId,
     handler: async (response: any) => {
       
         toast("✅ Payment successful!", {
            description: "Payment ID:"+response.razorpay_payment_id,
            icon: <CheckCircle2 className="text-white" />,
            style: {
              background:
               "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 60%, #f5f5dc 100%)"

               ,


              color: "white",
              borderRadius: "1rem", // rounded-xl
              boxShadow:
                "0 8px 16px rgba(99, 102, 241, 0.5), 0 4px 6px rgba(139, 92, 246, 0.4)", 
              padding: "1rem 1.25rem",
              fontWeight: "600",
              fontSize: "1rem",
              // border:"10px",
              gap:"1rem"
            },
            className: "backdrop-blur-md", 
          })
      const res =  await axios.post("/api/orders", {
          paymentId: response.razorpay_payment_id,
          items: cartProducts,
          totalAmount: total,
        });

        // 4️⃣ Clear cart after success
        clearCart([]);  
      },
      prefill: {
        name: "Your Customer",
        email: "customer@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#F37254",
      },


      
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
   <div className="bg-[#FFEDB8] p-4 sm:p-8 lg:p-10">
  <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="afterInteractive"
  />

  <div className="bg-white w-full pt-6 sm:pt-10 rounded-3xl">
    {/* Header Row */}
    <div className="hidden md:flex items-center justify-center">
      <div className="bg-red-500 p-4 rounded-2xl flex text-white font-bold capitalize justify-between px-6 sm:px-10 w-full mx-10">
        <p className="w-1/4">Product</p>
        <p className="w-1/4 text-center">Price</p>
        <p className="w-1/4 text-center">Quantity</p>
        <p className="w-1/4 text-right">Subtotal</p>
      </div>
    </div>

    {/* Empty Cart */}
    {cartProducts?.length === 0 && (
      <div className="p-6 sm:p-10 text-center text-lg sm:text-xl font-semibold">
        🛒 Your cart is empty
      </div>
    )}

    {/* Cart Items */}
    {cartProducts?.length > 0 &&
      cartProducts.map((product: any, index: number) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-4 sm:py-5 gap-4 md:gap-0"
        >
          {/* Product Info */}
          <div className="w-full md:w-1/4 flex items-center space-x-4">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-xl border w-20 h-20"
              />
            )}
            <p className="font-semibold text-sm sm:text-base">{product.name}</p>
          </div>

          {/* Price */}
          <p className="w-full md:w-1/4 text-left md:text-center text-sm sm:text-base">
            ₹{product.price}
          </p>

          {/* Quantity with + - buttons */}
          <div className="w-full md:w-1/4 flex items-center justify-start md:justify-center space-x-2">
            <button
              onClick={() => decreaseQuantity(index)}
              className="px-2 py-1 bg-gray-300 rounded-lg font-bold"
            >
              -
            </button>
            <span className="w-8 text-center">{product.quantity}</span>
            <button
              onClick={() => increaseQuantity(index)}
              className="px-2 py-1 bg-gray-300 rounded-lg font-bold"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="w-full md:w-1/4 flex items-center justify-between md:justify-end space-x-4">
            <p className="font-semibold text-sm sm:text-base">
              ₹{(Number(product.price) * Number(product.quantity)).toFixed(2)}
            </p>
            <button
              onClick={() => removeCartProduct(index)}
              className="text-red-500 font-bold hover:underline"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

    {/* Total Row */}
    <div className="flex justify-end px-4 sm:px-6 lg:px-10 py-4 sm:py-6 font-bold text-lg sm:text-xl">
      Total: ₹
      {cartProducts
        .reduce(
          (sum: number, p: any) => sum + Number(p.price) * Number(p.quantity),
          0
        )
        .toFixed(2)}
    </div>

    {/* Checkout Button */}
    {cartProducts?.length > 0 && (
      <div className="flex justify-center items-center pb-5">
        <button
          className="bg-red-500 px-6  py-2 sm:py-3 rounded-2xl text-white font-bold text-base sm:text-lg  sm:w-[10rem]
          hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={handlePayment}
        >
          Check Out
        </button>
      </div>
    )}
  </div>
</div>

  );
}

export default Cart;
