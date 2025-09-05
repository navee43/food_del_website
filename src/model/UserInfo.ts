import mongoose, { Schema, Document } from "mongoose";

export interface UserInfo extends Document {
  userId: mongoose.Types.ObjectId; 
  name: string;
  email: string;
  street?: string;
  postal?: string;
  city?: string;
  country?: string;
  phoneNo?: string; 
  admin?: boolean;
}

const UserInfoSchema: Schema<UserInfo> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String },

   

    street: { type: String },
    postal: { type: String },
    city: { type: String },
    country: { type: String },
    phoneNo: { type: String },

    admin: { type: Boolean, default: false },
  },
  { timestamps: true } 
);

export const UserInfoModel =
  (mongoose.models.UserInfo as mongoose.Model<UserInfo>) ||
  mongoose.model<UserInfo>("UserInfo", UserInfoSchema);
