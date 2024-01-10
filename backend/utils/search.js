const search = (products, query) => {
    const keysToSearch = ["name", "variants.flavor", "brand", "variants.sizeDetails.sizeProduct"]
    const searchTerms = query.split(' ').map(term => term.toLowerCase());

    const filterBySearchTerms = (value) => {
        const lowerCaseValue = String(value).toLowerCase();

        return searchTerms.some(term => lowerCaseValue.includes(term));
    };

    const searchInArray = (array) => {
        let found = false;

        const searchRecursively = (element) => {
            if (Array.isArray(element)) {
                return element.some((subElement) => {
                    const { flavor, sizeDetails } = subElement;

                    if (flavor && filterBySearchTerms(flavor)) {
                        subElement.isSelected = true;
                        found = true;
                    } else subElement.isSelected = false

                    if (sizeDetails) {
                        return sizeDetails.some((size) => {
                            if (size.sizeProduct && filterBySearchTerms(size.sizeProduct)) {
                                size.isSelected = true;
                                found = true;
                            }
                        });
                    }

                    return searchRecursively(Object.values(subElement));
                });
            }
        };
        searchRecursively(array);
        return found;
    };

    const filterProducts = (keys, product) => {
        return keys.some(key => {
            const nestedKeys = key.split('.');
            for (const nestedKey of nestedKeys) {
                if (product[nestedKey]) {
                    const nestedValue = product[nestedKey];

                    if (Array.isArray(nestedValue)) return searchInArray(nestedValue)
                    return filterBySearchTerms(nestedValue)
                }
            }

            if (typeof product === 'string') {
                if (filterBySearchTerms(product)) {
                    return true;
                }
            }
        });
    };

    const filteredProducts = products.filter(product => filterProducts(keysToSearch, product));

    return filteredProducts
};



module.exports = search