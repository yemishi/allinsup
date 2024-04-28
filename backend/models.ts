import mongoose, { Model, Document } from "mongoose";
import { OrderType, ProductType, SellType, UserType } from "./types/types";

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: Boolean,
  address: {
    address: String,
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
  userId: { type: String, require: true },
  productId: { type: String, require: true },
  productSize: { type: String, require: true },
  productFlavor: { type: String, require: true },
  totalPrice: { type: Number, require: true },
  qtd: { type: Number, require: true },
});

const orderSchema = new mongoose.Schema<OrderDocument>({
  userId: { type: String, require: true },
  status: { type: String, require: true },
  user: { isDeleted: Boolean, name: String, email: String },
  totalPaid: Number,
  method: String,
  purchaseDate: { type: Date, require: true },
  receivedDate: Date,
  address: {
    address: { type: String, require: true },
    cep: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    houseNumber: { type: Number, require: true },
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

const Product = mongoose.model<ProductDocument, ProductModel>(
  "Product",
  productSchema
);
const Order = mongoose.model<OrderDocument, OrderModel>("Order", orderSchema);

const Sell = mongoose.model<SellDocument, SellModel>("Sell", sellSchema);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { Order, Sell, User, Product };
