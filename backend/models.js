const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    tel: String,
    address: { tel: String, address: String, name: String, cep: String, state: String, city: String, houseNumber: Number, complement: String },

})

const soldSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    flavor: String,
    sizeProduct: String,
    qtd: Number,
    purchaseDate: String,
})

const order = new mongoose.Schema({
    userId: String,
    orderId: String,
    extra: Object,
    products: [{ productId: String, productQtd: Number, coverPhoto: String, name: String, productPrice: String }],
    status: String,
    price: String,
    purchaseDate: String,
    receivedDate: String,
    address: { tel: String, address: String, name: String, cep: String, state: String, city: String, houseNumber: Number, complement: String }
})

const navCollections = new mongoose.Schema({
    name: String,
    banner: String,
    color: String
})

const sizeTypeSchema = new mongoose.Schema({
    sizeProduct: String,
    price: Number,
    stock: Number,
    sizeHighlight: Boolean,
    promotion: Number,
    isSelected: Boolean
});

const variantTypeSchema = new mongoose.Schema({
    flavor: String,
    isSelected: Boolean,
    photos: [String],
    sizeDetails: [sizeTypeSchema]
});

const descSchema = new mongoose.Schema({
    title: String,
    text: String
});

const productSchema = new mongoose.Schema({
    name: String,
    desc: [descSchema],
    category: String,
    brand: String,
    variants: [variantTypeSchema],
    highlight: Number
});


const Sold = mongoose.model('Sold', soldSchema, 'sold')
const NavCollection = mongoose.model('NavCollection', navCollections, 'navCollection')
const User = mongoose.model('User', userSchema, 'users');
const Product = mongoose.model('Product', productSchema, 'products');
const Order = mongoose.model("Order", order, "order")
module.exports = {
    User, Product, NavCollection, Order, Sold
};