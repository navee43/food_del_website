'use client'
import React from 'react'
import UserTabs from '@/components/layout/userTabs'
import { useState } from 'react';
import axios from 'axios';
 import { CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useSession } from 'next-auth/react';
import { useProfile } from '@/components/userProfile';







function  MenuPage() {
 const [url, setUrl] = useState("")
 const [name , setName] = useState("")
 const [description , setDescription] = useState("")
 const [price , setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null);
  const[preview , setPreview] = useState("");
  const [Ingredients , setIngredients] =useState("");
  const [isSaving , setIsSaving]  =useState(false)

  const session = useSession();
// const status = session.status;
const {data } = useProfile();

        console.log("session" , session?.data?.user)
 


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
       const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      
      // console.log("the file is ",file)
    }
  };

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  setIsSaving(true);

  e.preventDefault(); 

    if (!file) {
       toast("file not found", {
            description: "select a file  ",
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
        return;
    }
    const data = new FormData();
    data.append("file" , file)
    data.append("name" , name)  
    data.append("description", description)
    data.append("Ingredients" , Ingredients)
    data.append("price", price)
    

    try {
      const resp = await axios.post("/api/menuitem", data);
      

     
      if (resp.status === 200) {
        setIsSaving(false);
         toast("Success!", {
            description: "Your file was uploaded successfully ",
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
    } catch (err) {
      console.error("Upload failed:", err);
       toast("failed!", {
            description: "Your file is too large in size  ",
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
  


   return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center py-10 space-y-10">
  <UserTabs admin={data?.data.userInfo.admin || false}  />

  <form
    onSubmit={handleSubmit}
    className="flex flex-col md:flex-row items-center gap-8 md:gap-10 bg-white shadow-md rounded-2xl p-6 sm:p-10 lg:p-16 xl:p-20 w-[350px] md:w-full max-w-4xl px-10 "
  >
    {/* Left Image Preview */}
    <div className="flex flex-col items-center gap-3">
      <img
        src={preview || "/default.png"}
        alt="preview"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border border-gray-400"
      />
      <label className="cursor-pointer text-sm px-3 py-1 bg-gray-200 border border-black rounded-lg hover:bg-gray-300">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        Change Photo
      </label>
    </div>

    {/* Form Fields */}
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg p-2"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg p-2"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ingredients</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg p-2"
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg p-2"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="sm:col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
        >
          {isSaving && (
            <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </form>
</div>

  );

}

export default  MenuPage