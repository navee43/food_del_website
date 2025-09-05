import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDb";
import Order from "@/model/Order";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // your next-auth config

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  console.log("the body is " , body)

  
  const session = await getServerSession(authOptions);
//   console.log("check authentication" , authOptions)
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

 

  const order = await Order.create({
    userId: session.user._id,   
    items: body.items,
    totalAmount: body.totalAmount,
    paymentId: body.paymentId,
  });

  return NextResponse.json(order);
}

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // ✅ Fetch only that user's orders
  const orders = await Order.find({ userId: session.user._id }).sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
