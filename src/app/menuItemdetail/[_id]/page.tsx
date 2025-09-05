"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { AtSign } from "lucide-react";
import Image from "next/image";
import {CarsoulStaticData} from '@/data/HardcodedData'
import { pizzas } from "@/data/HardcodedData";
import { burgers } from "@/data/HardcodedData";
import Link from 'next/link'  
 import { CartContext } from "@/context/authProvider";
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

// Example hardcoded data


export default function Page() {

type MenuItem = {
  _id?: string;
  // id?:number;
  name: string;
  description?: string;
  price: number;
  image?: string;
 
  Ingredients:string;
  Description:string;
};

  const {cartProducts}:any = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const {addToCart}:any = useContext(CartContext)
  console.log("the length is ",cartProducts?.length)
  const params = useParams();
  const _id = params._id as string | undefined;
  console.log("the id is ", _id)
  const [itemData, setItemData] = useState<MenuItem>();

  useEffect(() => {
    if (!_id) return;

    // numeric id → hardcoded
    if (/^\d+$/.test(_id)) {
      const staticItem = CarsoulStaticData.find(i => i.id.toString() === _id ) ||
        pizzas.find((i) => i.id.toString() === _id) ||
        burgers.find((i) => i.id.toString() === _id);
      setItemData(staticItem);
      // console.log(staticItem)
      return;
    }

    // mongoId → API
    if (/^[0-9a-fA-F]{24}$/.test(_id)) {
      (async () => {
        try {
          const resp = await axios.post(`/api/menu-item-data`, { _id });
          if (resp.status === 200) {
         setItemData({ ...resp.data, id: resp.data._id });

          }
        } catch (err) {
          console.error("API error:", err);
        }
      })();
    }
  }, [_id]);



  

  return (
   <div className="min-h-screen bg-[#FFEDB8] w-full px-4 py-6">
  <div className="w-full flex flex-col md:flex-row md:h-3/4 gap-6">
    
    {/* Product Section */}
    <div className="flex flex-col md:flex-row w-full md:w-3/4">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex flex-col items-center pt-10 md:pt-20">
        {itemData?.image && (
          <Image
            src={itemData.image}
            alt=""
            width={300}
            height={300}
            className="border-10 border-white rounded-4xl object-contain"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 pt-10 md:pt-20 flex flex-col space-y-8 px-10 ">
        <h1 className="text-2xl md:text-3xl font-bold">₹{itemData?.price}</h1>

        <div>
          <p className="font-semibold text-lg">Ingredients :</p>
          <p>{itemData?.Ingredients}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
       <input
  type="number"
  min="1"
  step="1"
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value))}
  className="bg-white border-2 border-gray-300 w-24 p-2 rounded-2xl text-center"
/>
          <button
            onClick={() => {addToCart({ ...itemData, quantity }),  toast("✅ added", {
            description: "item added to cart ",
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
          }) }
          }
            
            className="bg-red-500 px-5 py-3 rounded-2xl text-white font-semibold hover:scale-105 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    {/* Cart Section */}
    <div className="bg-white w-full md:w-1/4 flex flex-col justify-start p-4 rounded-xl shadow-md">
      <p className="font-semibold text-2xl md:text-3xl pb-4">Cart</p>

      {cartProducts && cartProducts.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {cartProducts.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-row space-x-4 items-center text-left w-full"
            >
             {item.id ? <Link href={`/menuItemdetail/${item.id}`}> <img
                src={item.image}
                alt={item.name}
                className="border-2 border-gray-300 rounded-2xl w-20 h-20 object-cover"
                
              /></Link>
              : <Link href={`/menuItemdetail/${item._id}`}> <img
                src={item.image}
                alt={item.name}
                className="border-2 border-gray-300 rounded-2xl w-20 h-20 object-cover"
                
              /></Link>
            
            }
              <div>
                <p className="font-semibold text-base md:text-lg">{item.name}</p>
                <div className="flex space-x-2">
                  <p className="font-semibold">{item.quantity}</p>
                  <p>x</p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
          <Separator className="bg-black" />
          <div className="w-full">
            <Link
              href="/cart"
              className="bg-red-500 block text-center py-3 rounded-2xl font-bold text-white hover:scale-105 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div>No product in the cart</div>
      )}
    </div>
  </div>

  {/* Description Section */}
  <div className="mt-10 px-2 md:px-28">
    <p className="font-bold text-xl md:text-2xl">Description</p>
    {itemData && (
      <div>
        <p className="mt-2">{itemData.Description}</p>
      </div>
    )}

    <div className="flex flex-wrap gap-4 pt-6">
      <p className="gap-1 flex items-center">
        <AtSign className="text-red-500 size-5" /> pizza
      </p>
      <p className="gap-1 flex items-center">
        <AtSign className="text-red-500 size-5" /> burger
      </p>
      <p className="gap-1 flex items-center">
        <AtSign className="text-red-500 size-5" /> pasta
      </p>
    </div>
  </div>
</div>

  );
}
