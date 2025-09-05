import connectDb from "@/lib/connectDb";
import {UserModel}  from "@/model/User";



export async function POST(request : Request){
    connectDb()
    try {

        const {username, Code} =  await request.json()
         console.log("verify code is ",Code , username)
    
const decodedUsername = decodeURIComponent(username);
//url se chize ati ho to ek baar unko decode kar lena chiye   kai baar url me space hota h to vo 20% me kar ke deta h 
//ye method jo actual value h to ek baar kar lena chiye 
       
        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
            success:false,
            Message:"User not found "
        },
        {status:500}
    
    )
        }

        const isCodeValid = Code === user.verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

       if(isCodeValid && isCodeNotExpired){
        user.isVerified = true;
        await user.save()

         return Response.json({
            success:true,
            Message:"account verified success "
        },
        {status:200}
    
    )
       }
       else if (!isCodeNotExpired){
         return Response.json({
            success:false,
            Message:"verification code expired please sign up again to get a new code "
        },
        {status:500}
    
    )
       }
       else{
         return Response.json({
            success:false,
            Message:"verification code is incorrect  "
        },
        {status:500}
    
    )
       }
        
    } catch (error) {
console.log("error verifying verify code ", error)
        return Response.json({
            success:false,
            Message:"error checking verify code "
        },
        {status:500}
    
    )
        
    }

}