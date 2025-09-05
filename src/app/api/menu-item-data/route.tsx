import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/lib/connectDb";
import { MenuItemModel } from "@/model/MenuItems";

export async function POST(req: NextRequest) {
  try {
    await connectDb(); 

    const body = await req.json();
    const {_id} = body;
    // console.log("the id is" , _id)

    if (!_id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

   
    const decodedId = decodeURIComponent(_id);
    // console.log("Decoded ID:", decodedId);

    const itemData = await MenuItemModel.findById(decodedId);

    if (!itemData) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(itemData, { status: 200 });
  } catch (error) {
    console.error("Error while getting item data:", error);
    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 500 }
    // );
  }
}
