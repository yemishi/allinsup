const productInfo = require('./productInfo')
const search = require('./search')
const { generateOrderNumber, updateStock, searchOrders } = require('./functions')
module.exports = { search, productInfo, updateStock, generateOrderNumber, searchOrders }