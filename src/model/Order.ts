import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder extends Document {
  userId: string; 
  items: OrderItem[];
  totalAmount: number;
  paymentId: string;
  status: "Pending" | "Paid" | "Failed";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true }, // could also be ObjectId if you have a User model
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);


const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
