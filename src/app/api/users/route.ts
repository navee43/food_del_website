import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import {UserModel} from  '@/model/User';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req:Request){
    connectDb();
    try{

        const session = await getServerSession(authOptions);
        
            if (!session) {
              return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
              );
            }
        const users = await UserModel.find({});
        return NextResponse.json({ success: true, data: { users} });



    }
    catch(error){
        return NextResponse.json({error: "something went wrong while fetching the users", } ,{status:500})

    }
}