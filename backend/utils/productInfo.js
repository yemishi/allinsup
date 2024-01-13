const productInfo = (product, flavorSelected, size) => {

    const { variants } = product
    variants.forEach((variant) => {
        const { flavor, sizeDetails } = variant
        if (flavor === flavorSelected) {
            variant.isSelected = true
        } else variant.isSelected = false

        sizeDetails.forEach((detail) => {
            const { sizeProduct } = detail
            if (sizeProduct === size) detail.isSelected = true

        })
    })
    return product
}

module.exports = productInfo