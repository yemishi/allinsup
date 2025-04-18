"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.User = exports.Sell = exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
const productSchema = new mongoose_1.default.Schema({
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
const sellSchema = new mongoose_1.default.Schema({
    userId: { type: String, require: true },
    productId: { type: String, require: true },
    productSize: { type: String, require: true },
    productFlavor: { type: String, require: true },
    totalPrice: { type: Number, require: true },
    qtd: { type: Number, require: true },
});
const orderSchema = new mongoose_1.default.Schema({
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
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
const Order = mongoose_1.default.model("Order", orderSchema);
exports.Order = Order;
const Sell = mongoose_1.default.model("Sell", sellSchema);
exports.Sell = Sell;
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
