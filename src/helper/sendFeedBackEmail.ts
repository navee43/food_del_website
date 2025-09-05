'use server'
import type { NextApiRequest, NextApiResponse } from 'next';
import FeedBackEmail from '../../email/feedbackEmail';
import { Resend } from 'resend';
import { sendFeedbackSchema } from '@/Schema/sendFeedBackSchema';
import {z} from 'zod'
import { ApiResponse } from "@/types/Response";
import { resend } from "@/lib/resend";


export async function sendFeedBackEmail(email:string,
    Name:string ,subject:string , comment:string
): Promise<ApiResponse>{
    try {
     await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: "naveenyadav11k@gmail.com",
    subject: subject,
    react: FeedBackEmail({ Name, comment , email , subject  }),
  });

        return {success:true , message:'email sent successfully '}

        
    } catch (emailError) {
        console.error("error sending feedback email ", emailError)
       return {success:false,message:'failed to send feedback email'}
    }
}




