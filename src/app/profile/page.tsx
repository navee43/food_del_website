'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import check from '../../../public/images/check.png'
import Image from 'next/image';

import UserTabs from '@/components/layout/userTabs';
import { useProfile } from '@/components/userProfile';
import {toast} from 'sonner'
import { CheckCircle2 } from 'lucide-react';



function ProfilePage() {
  const {data:session , update , status}= useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving , setIsSaving] = useState(false)
  const [saved , setSaved] = useState(false)
 const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState(session?.user?.image)
  const [name , setName] = useState("")
  const [phoneNo , setPhoneNo] = useState("")
  const [street , setStreet] = useState("")
  const [country , setCountry] = useState("")
   const [postal , setPostal] = useState("")
   const [city , setCity] = useState("")
   const [isAdmin  , setIsAdmin] = useState(false);
    const { data, loading, error } = useProfile();


    
useEffect(() => {
  if (data?.data?.userInfo) {
    setName(data.data.userInfo.name || "");
    setPhoneNo(data.data.userInfo.phoneNo || "");
    setStreet(data.data.userInfo.street || "");
    setCountry(data.data.userInfo.country || "");
    setCity(data.data.userInfo.city || "");
    setPostal(data.data.userInfo.postal || "");
    setEmail(session?.user.email || ""); 
     setUrl(data.data.userInfo.image || session?.user.image || ""); 
  }
}, [data]);



 


   

  



const handleImageSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
// console.log("start sending ")
  const file = e.target.files;
  if (file?.length === 1) {
    const data = new FormData();
    data.set("file", file[0]);
    

    try {
      const resp = await axios.post("/api/upload", data);
      const incomingData = resp.data; 
      setUrl(incomingData.result.url)
      

        if (resp.status === 200) {
  setUrl(incomingData.result.url);
   toast("image updated", {
            description: "image updated successfully ",
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

 
  await update();
      
        }


    } catch (err) {
      console.error("Upload failed:", err);
       toast("upload failed", {
                  description: "image size is too large  ",
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
    }
  }
};


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submission");
    setIsSaving(true)

    const data = new FormData;
    data.append("name", name)
    data.append("phoneNo", phoneNo)
    data.append("street", street)
    data.append("country", country)
    data.append("city", city)
    data.append("postal", postal)

    

    try {
      const response = await axios.post(`/api/profile`,data);
      console.log("the response", response.status);
      
      if(response.status==200){
         toast("profile updated", {
            description: "your profile updated successfully",
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
        setIsSaving(false)

      }
    } catch (error) {
      console.error("no response", error);
    } 
  };

  return (
   <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#FFEDB8] bg-center flex-col space-y-10
   
   "
  //  style={{backgroundImage:'url("https://images.unsplash.com/photo-1609446605707-fb3732c2dbdc?q=80&w=1676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
   >
    <UserTabs admin={data?.data.userInfo.admin} />
  <div className="bg-white w-full max-w-6xl rounded-3xl shadow-md flex flex-col lg:flex-row items-center lg:items-start justify-between p-6 md:p-12 gap-8">


   
    <label className="relative cursor-pointer flex flex-col items-center">
      <input type="file" className="hidden" onChange={handleImageSubmit} />
      <img
        src={url}
        width="200"
        height="200"
        alt="Profile"
        className="rounded-full w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover border-2 border-gray-300"
      />
      <span className="mt-2 text-sm text-white bg-red-500 rounded-4xl p-2 font-bold hover:scale-105 transition-transform duration-500">Change photo</span>
    </label>

   
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full lg:w-2/3 gap-4"
    >
      <label className="flex flex-col">
        <span className="text-sm font-medium">Full Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="p-2 text-lg border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
          className="p-2 text-lg border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          value={phoneNo}
          placeholder="Phone no"
          onChange={(e) => setPhoneNo(e.target.value)}
          className="p-2 text-lg border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          value={street}
          placeholder="Street address"
          onChange={(e) => setStreet(e.target.value)}
          className="p-2 text-lg border border-gray-300 rounded-md w-full"
        />
        <input
          type="number"
          value={postal}
          placeholder="Postal code"
          onChange={(e) => setPostal(e.target.value)}
          className="p-2 text-lg border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 text-lg border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 text-lg border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="col-span-2 flex justify-center mt-4">
  <button
    type="submit"
    disabled={isSaving}
    className="flex items-center gap-2 bg-black  text-center text-white px-6 py-2 rounded-xl hover:bg-gray-800 font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
  >
    {isSaving && (
      <div className="w-5 h-5 border-2 border-yellow-400   border-t-transparent rounded-full animate-spin"></div>
    )}
    {isSaving ? "Saving..." : "Save"}
  </button>
</div>
    </form>
  </div>
</div>

  );
}

export default ProfilePage;
