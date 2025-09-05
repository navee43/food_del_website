import mongoose , {Schema , Document} from "mongoose";



export interface User extends Document{
    username : string;
    email: string;
    password :string;
    verifyCode:string;
    verifyCodeExpiry: Date;
    isVerified :Boolean
    image:string;
    // userInfo:mongoose.Types.ObjectId;

}



const UserSchema :Schema<User> = new Schema({
    username:{
        type:String,
        required:[true , "username is required"],
        trim:true,
        unique:true
    }
    ,
    
    image:{
        type:String
        , default:"https://www.freeiconspng.com/uploads/no-image-icon-0.png" 
    }

    ,

    email:{
        type:String,
        required:[true , "email is required"],
        trim:true ,
        unique:true,
        match:[/.+\@.+\..+/ , "please provide a valid email"]
    }
    ,password:{
        type:String,
        required:[true , "password is required"]
    }
    ,
    verifyCodeExpiry:{
        type:Date , 
        required :[true , "verify code is required"]
    },
    isVerified :{
        type:Boolean,
        default:false


    }
    ,
    // userInfo:{
    //     type: Schema.Types.ObjectId, ref: "userInfo"
    // }
} , {timestamps:true})

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , UserSchema)