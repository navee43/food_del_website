import mongoose , {Schema , Document} from "mongoose";

export interface MenuItem extends Document{
   
    image:string;
     ItemName:string;
     Description:string;
     Ingredients:string;
     price:string
    

}



const MenuItemSchema :Schema<MenuItem> = new Schema({
   image:{type:String},
   ItemName:{type:String}
   ,
   Description:{type:String},
   price:{type:String}
   ,Ingredients:{type:String}
} , {timestamps:true})

export const MenuItemModel = (mongoose.models.MenuItem as mongoose.Model<MenuItem>) || mongoose.model<MenuItem>("MenuItem" , MenuItemSchema)