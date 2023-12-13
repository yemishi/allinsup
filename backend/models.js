const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: String,
    address: Object,

})

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    mainPhoto: String,
    photos: Array,
    category: String,
    brand: String,
    variants: Array,
    highlight: Number
})

const soldSchema = new mongoose.Schema({
    buyer: Object,
    product: String,
    productId: String,
    stockSize: Number,

})

const navCollections = new mongoose.Schema({
    name: String,
    banner: String,
    color: String
})
const NavCollection = mongoose.model('NavCollection', navCollections, 'navCollection')
const User = mongoose.model('User', userSchema, 'users');
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = {
    User, Product, NavCollection
};