import { NextRequest, NextResponse } from "next/server";
import  {CategoryModel}  from "@/model/Category";

export async function POST(request:NextRequest) {
try {
    
  const body = await request.json();
  console.log("the body",body.newCategory)
  const newCategory = new CategoryModel({name:body.newCategory})

   await newCategory.save()
    if(!newCategory){
 return NextResponse.json({message:"category not created"} , {status:400})

    }

    return NextResponse.json({message:"category created successfully " , newCategory} , {status:200})
    
} catch (error) {
    console.log("error while creating new category in backend side " , error)
}
    
}