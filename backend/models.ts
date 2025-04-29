import mongoose, { Model, Document } from "mongoose";
import { OrderType, ProductType, SellType, UserType } from "./types/types";

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
  address: {
    name: String,
    cep: String,
    state: String,
    city: String,
    houseNumber: Number,
    complement: String,
  },
});

const productSchema = new mongoose.Schema<ProductDocument>({
  name: { type: String, required: true },
  desc: [{ title: String, text: String }],
  category: { type: String, required: true },
  brand: { type: String, required: true },
  variants: [
    {
      flavor: { type: String, required: true },
      photos: [String],
      sizeDetails: [
        {
          size: { type: String, required: true },
          price: { type: Number, required: true },
          stock: { type: Number, required: true },
          isHighlight: { type: Boolean },
          promotion: Number,
        },
      ],
    },
  ],
});

const sellSchema = new mongoose.Schema<SellDocument>({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productSize: { type: String, required: true },
  productFlavor: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  qtd: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema<OrderDocument>({
  orderId: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
  },
  status: { type: String, required: true },
  totalPaid: Number,
  method: String,
  purchaseDate: { type: Date, required: true },
  receivedDate: Date,
  address: {
    name: { type: String, required: true },
    cep: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    complement: String,
  },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      flavor: { type: String, required: true },
      size: { type: String, required: true },
      coverPhoto: { type: String, required: true },
      price: { type: String, required: true },
      qtd: { type: Number, required: true },
    },
  ],
});

interface OrderDocument extends Document, OrderType {}
interface OrderModel extends Model<OrderDocument> {}

interface SellDocument extends Document, SellType {}
interface SellModel extends Model<SellDocument> {}

interface UserDocument extends Document, UserType {}
interface UserModel extends Model<UserDocument> {}

interface ProductDocument extends Document, ProductType {}
interface ProductModel extends Model<ProductDocument> {}

const Product = mongoose.model<ProductDocument, ProductModel>("Product", productSchema);
const Order = mongoose.model<OrderDocument, OrderModel>("Order", orderSchema);

const Sell = mongoose.model<SellDocument, SellModel>("Sell", sellSchema);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { Order, Sell, User, Product };
