"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/userTabs";
import { useProfile } from "@/components/userProfile";


  type OrderItem = {
  id?: string;        // if you store item ID
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  _id: string;
  paymentId: string;
  totalAmount: number;
  items: OrderItem[];
};
export default function Orders() {
 const [orders, setOrders] = useState<Order[]>([]);

const { data, error } = useProfile();



  useEffect(() => {
   const fetchOrders = async()=>{
     const res = await axios.get('/api/orders')
     console.log(res)
     if(res.data){
        setOrders(res.data)
        
     }
     else{
        alert("error in fetching orders")
     }

   }
   fetchOrders();
  }, []);

return (
  <div className="p-6 md:p-10 min-h-screen bg-gray-50">
   <div className="flex flex-col items-center justify-center">
     <div className="w-[400px]"><UserTabs admin={data?.data.userInfo.admin} /></div>
   </div>
    <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Orders</h1>

    {orders.length === 0 && (
      <p className="text-gray-500 text-center">No orders found.</p>
    )}

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition duration-300"
        >
          {/* Order Header */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Payment ID:</span> {order.paymentId}
            </p>
            <p className="text-lg font-semibold mt-2">
              Total: <span className="text-green-600">₹{order.totalAmount}</span>
            </p>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item: OrderItem, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3"
              >
                {/* Image */}
                <img
                  src={item.image || "/default.png"}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover border"
                />

                {/* Item Info */}
                <div className="flex-1 px-3">
                  <p className="font-medium text-sm md:text-base">{item.name}</p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                {/* Price */}
                <span className="font-semibold text-sm md:text-base">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
