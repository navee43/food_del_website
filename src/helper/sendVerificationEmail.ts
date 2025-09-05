import { resend } from "@/lib/resend";
import VerificationEmail  from "../../email/emailVerification";
import { ApiResponse } from "@/types/Response";



export async function sendVerificationEmail(email:string,
    username:string ,verifyCode:string
): Promise<ApiResponse>{
    try {
     await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Gomino | verification Code',
    react: VerificationEmail({ username, otp:verifyCode }),
  });
  console.log("email , ", email)
  console.log("username" , username, verifyCode)

        return {success:true , message:'email sent successfully '}

        
    } catch (emailError) {
        console.error("error sending verification email ", emailError)
       return {success:false,message:'failed to send verification email'}
    }
}




