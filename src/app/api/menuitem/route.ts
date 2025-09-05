
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import {  MenuItemModel } from "@/model/MenuItems";
import mongoose, { Schema } from "mongoose";
import connectDb from "@/lib/connectDb";
import { success } from "zod";


export async function POST(req: NextRequest) {
  connectDb();

    const session = await getServerSession(authOptions) 
  try {
    const data:any = await req.formData();
    // const ingre = data.get("Ingredients")
    // console.log("the ingree is fraud",ingre)
    // console.log(data)
   
    // console.log("the form data is " ,data.get("name"));
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result:any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "nextjs_uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const imagedata = result?.url;

      const menu = new MenuItemModel({
        image: imagedata,
        ItemName: data.get("name"),
        Description: data.get("description"),
         Ingredients:data.get("Ingredients"),
        price : data.get("price") 

      })

      await menu.save();

     


    return NextResponse.json({ success: true, menu });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong while updating menu item ", details: error }, { status: 500 });
  }
}



export async function GET(req:NextRequest){
  connectDb();
  try {
    const newAdded = await MenuItemModel.find({});

    if(!newAdded){
      return NextResponse.json({message:"no data found"} , {status:400})
    }

    return NextResponse.json({success:true ,data : newAdded})

    
  } catch (error) {
    console.log("error while getting newly added items " , error)
    
  }
}
