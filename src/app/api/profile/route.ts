import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDb from "@/lib/connectDb";
import { UserModel } from "@/model/User";
import { UserInfoModel } from "@/model/UserInfo";
import { error } from "console";
import { success } from "zod";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const phoneNo = formData.get("phoneNo")  as string;
    const street = formData.get("street") as string;
    const country = formData.get("country") as string;
    const city = formData.get("city")  as string;
    const postal = formData.get("postal")  as string;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

   
    let userInfo = await UserInfoModel.findOne({ userId: user._id });
    if (!userInfo) {
      userInfo = new UserInfoModel({ userId: user._id });
    }

    userInfo.name = name;
    userInfo.phoneNo = phoneNo;
    userInfo.street = street;
    userInfo.country = country;
    userInfo.city = city;
    userInfo.postal = postal;

    await userInfo.save();

    return NextResponse.json({ success: true, userInfo });
  } catch (error) {
    console.error("Profile update failed:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}









export async function GET(request: NextRequest) {

  connectDb();
  try {
    const session = await getServerSession(authOptions);
    // console.log(session?.user)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "No email found in session" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: userEmail });
const userInfo = await UserInfoModel.findOne({ userId: user?._id });

return NextResponse.json({ success: true, data: { user, userInfo } });
   

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error while fetching current user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

