import connectDb from "@/lib/connectDb";
import {UserModel} from "../../../model/User";
// import  UserModel from "../../../"
import bcrypt  from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { request } from "http";
import { success } from "zod";


export async function  POST(request:Request){
await connectDb()
try {
    const {username , email , password} = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified:true
    })

    const verifyCode = Math.floor(100000 + Math.random()*900000).toString();
    if(existingUserVerifiedByUsername){
        if(existingUserVerifiedByUsername.isVerified){
           return Response.json({
    success:false   , 
    Message:"User already exists "
   },{status:201})
        }
        else{
            const hashedPass = await bcrypt.hash(password, 10);
            existingUserVerifiedByUsername.password = hashedPass;
            existingUserVerifiedByUsername.verifyCode = verifyCode;
            existingUserVerifiedByUsername.verifyCodeExpiry = new Date(Date.now()+3600000)
            await existingUserVerifiedByUsername.save();
            return Response
        }
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);
        // here new keyword ki wajah se ye object banta h to object memory me referenced hota h to uske andar jo bhi h uski value vo change ho jati h 
        //to yaha chahe let ya const ho change kar skte h 

        const newUser = new UserModel({
             username, 
                email,
                password : hashedPassword,
                verifyCode :verifyCode,
                verifyCodeExpiry : expiryDate,
                isVerified : false,
                isAcceptingMessage: true,
                messages: [],
        })

        await newUser.save();

       
    }

    const emailResponse = await sendVerificationEmail(email, username , verifyCode);
    console.log("the email response is ",emailResponse)
    // now jo email ka response hota agar success ho to kuch hota vo docs dekh k pata lagega and error aya vo bhi docs se pata lagega so its  
    // better to read the docs first before writing code like here below 

   if(!emailResponse.success){
    return  Response.json({
        success:false,
        message:emailResponse.message
    },{status:500})
   }

   return Response.json({
    success:true , 
    Message:"User registered successfully and email has been sent successfully , please verify "
   },{status:201})

    

    
} catch (error) {
    console.error('Error registering user', error)
    return Response.json({success:false , message:"Error registering user"}
        ,{
            status:500
        }
    )
}
}