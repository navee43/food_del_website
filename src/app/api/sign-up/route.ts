import connectDb from "@/lib/connectDb";
import { UserModel } from "../../../model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  await connectDb();
  try {
    const { username, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ username });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { success: false, message: "User already exists" },
          { status: 201 }
        );
      } else {
        const hashedPass = await bcrypt.hash(password, 10);
        existingUser.password = hashedPass;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUser.save();

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        console.log("the email response is " , emailResponse)

        if (!emailResponse.success) {
          return NextResponse.json(
            { success: false, message: emailResponse.message },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { success: true, message: "Password updated and verification email sent" },
          { status: 200 }
        );
      }
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date(Date.now() + 3600000);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry: expiryDate,
      isVerified: false,
      isAcceptingMessage: true,
      messages: [],
    });

    await newUser.save();

    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
  console.log("the email response is " , emailResponse)
    
    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "User registered successfully and verification email has been sent",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
