import {z} from 'zod'
export const userNameValidation = z.string().min(2, "Username must be atleast 2 characters")
                      .max(15 , "username must not be more than 15 characters")
                      .regex(/^[a-zA-Z0-9_]+$/ ,"Username must not contains special characters" );



export const signUpSchema = z.object({
    username:userNameValidation , 
    email:z.string().email({message:"invalid email address"})
    ,
    password:z.string().min(6, {message:"password must be at least 6 characterse"})
})
