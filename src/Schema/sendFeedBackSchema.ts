import {z} from 'zod'

export const sendFeedbackSchema = z.object({
  Name: z.string().min(2, {message: "Username must be at least 2 characters.",}),
  Email:z.string().email() , 
  comment:z.string().min(2 ,{ message:"message must be at least 2 characters"}),
  subject:z.string()   })