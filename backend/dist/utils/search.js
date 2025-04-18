"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function search(products, query) {
    const searched = products.map((product) => {
        product.variants = deepSearch(product.variants, query);
        return product;
    });
    return searched;
}
exports.default = search;
const deepSearch = (variants, query) => {
    const updatedVariants = variants.map((variant) => {
        if (variant.flavor.includes(query))
            variant.isSelected = true;
        if (Array.isArray(variant.sizeDetails)) {
            variant.sizeDetails.map((details) => {
                if (details.size.includes(query))
                    details.isSelected = true;
                return details;
            });
        }
        ;
        return variant;
    });
    return updatedVariants;
};
