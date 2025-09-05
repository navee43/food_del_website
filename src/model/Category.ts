import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
  
  name:string;
}

const CategorySchema: Schema<Category> = new Schema(
  {
    

    name: { type: String },

   

  },
  { timestamps: true } 
);


export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<Category>) ||
  mongoose.model<Category>("Category", CategorySchema);
