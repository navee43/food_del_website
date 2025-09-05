
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { UserModel } from "@/model/User";

import connectDb from "@/lib/connectDb";

import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";


export async function POST(req: NextRequest) {
 await connectDb();
    const session = await getServerSession(authOptions)
    if(!session){
      console.log("user not authenticated")
      return NextResponse.json({error:"user not authenticated"} ,{status:401})
    }
    
    console.log("the session is",session);
  try {
    const formData = await req.formData();
    console.log("the file is ",formData)
    const file = formData.get("file") as File;
    console.log("the file", file)

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
 const result: UploadApiResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
  cloudinary.uploader
    .upload_stream({ folder: "nextjs_uploads" }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (error) return reject(error);
      if (!result) return reject(new Error("Upload failed, no result returned"));
      resolve(result);
    })
    .end(buffer);
});
    console.log("hello1" , result);

       if (!session) {  throw new Error("Not authenticated");}
   

   const user = await UserModel.findById(session.user._id);


   if (!user) {   throw new Error("User not found in database");}


     user.image = result?.url || user.image;

    
   await user.save();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed", details: error }, { status: 500 });
  }
}
