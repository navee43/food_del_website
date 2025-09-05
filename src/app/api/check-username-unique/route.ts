import connectDb from "@/lib/connectDb";
import {z} from 'zod';
import { userNameValidation } from "@/Schema/signUpSchema"
import { UserModel } from "@/model/User";


//now we wil create a query schema means kisi variable ua schema ko check karna ho to k
//ye syntex likthe h hum 
const usernameQuerySchema = z.object({
    username:userNameValidation
})
//it means jitne bhi parameter ayenge iske andar vo fulfill karna chiye username validation ko 
//now we will write a function  of get or post that will check if the sended user name is correct of not 
//isse fayda  kya hoga to signup ka baad user button dabayega tb to hum bheje hi bheje ge and also when 
// jb us box me user likh raha h usi waqt usko bata bhi skte h ki username valid h ya na available h ya na 
//so we will be using some kind of techinique in frontend side 

//so username ayega kaha se vo ayega url se , url ka andar query bhj dega ? laga k vaha se extract kar lenge 
// remember the syntex now jb url aa gya to waha se queryparam extract karenge and validate karane ke liye hum use 
// usernamequeryschema ke andar de denge and remeber the syntex

export async function GET(request:Request){
    await connectDb()
    try {

        const {searchParams} = new URL(request.url)
        // console.log("searchParamas is ",searchParams)
        const queryParam = {username:searchParams.get('username')}
        // console.log("queryParam is ", queryParam)
        const result = usernameQuerySchema.safeParse(queryParam)
        // console.log("result is " , result)
        if(!result.success){
             const usernameErrors = result.error.format().username?._errors || []
             
             return Response.json({
            success:false,
            message:usernameErrors?.length>0 ? usernameErrors.join(',') : "Invalid query parameters"
        },
        {status:400}
    
    )
        }
        const {username} = result.data;
        // console.log("the username is ", username)
        const existingVerifiedUser = await UserModel.findOne({
            username , isVerified : true
        })
        // console.log("existing user is" , existingVerifiedUser)
        if(existingVerifiedUser){
             return Response.json({
            success:false,
            message:"Username already taken "
        },
        {status:400}
    
    )
        
        }
         return Response.json({
            success:true,
            message:"Username is unique"
        },
        {status:200}
    
    )
  
        
        

        
    } catch (error) {
        console.log("error checking username" , error)
        return Response.json({
            success:false,
            message:"error checking username "
        },
        {status:500}
    
    )
        
    }
}