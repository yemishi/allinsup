const updateStock = async (products) => {
    const { Product } = require('../models');

    try {
        for (const { productId, flavor, sizeProduct, productQtd } of products) {
            const product = await Product.findOne({
                'variants.flavor': flavor,
                'variants.sizeDetails.sizeProduct': sizeProduct
            });

            if (product) {

                const currentStock = product.variants.find(variant =>
                    variant.flavor === flavor && variant.sizeDetails.some(size =>
                        size.sizeProduct === sizeProduct
                    )
                ).sizeDetails.find(size =>
                    size.sizeProduct === sizeProduct
                ).stock;

                const updatedStock = currentStock - productQtd;

                await Product.updateOne(
                    {
                        'variants.flavor': flavor,
                        'variants.sizeDetails.sizeProduct': sizeProduct
                    },
                    {
                        $set: {
                            'variants.$.sizeDetails.$[elem].stock': updatedStock > 0 ? updatedStock : 0
                        }
                    },
                    {
                        arrayFilters: [{ 'elem.sizeProduct': sizeProduct }]
                    }
                );

            } else {
                console.log(`Produto não encontrado para ${productId}`);
            }
        }
    } catch (error) {
        throw error;
    }
}

const generateOrderNumber = () => {
    const min = 10000000;
    const max = 99999999;
    const orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return orderNumber.toString();
}

const searchOrders = (orders, query) => {
    const keysToSearch = ["orderId", "price", "status"]
    const searchTerms = query.split(' ').map(term => term.toLowerCase());

    const filterBySearchTerms = (value) => {
        const lowerCaseValue = String(value).toLowerCase();
        return searchTerms.some(term => lowerCaseValue.includes(term));
    }

    const filterOrders = (keys, product) => {
        return keys.some(key => {

            if (product[key]) {
                const nestedValue = product[key];

                return filterBySearchTerms(nestedValue)
            }


        });
    };

    const filteredOrders = orders.filter(order => filterOrders(keysToSearch, order));

    return filteredOrders
}


module.exports = { generateOrderNumber, updateStock, searchOrders }