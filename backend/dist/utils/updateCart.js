"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
function updateCart(products, buyer) {
    return __awaiter(this, void 0, void 0, function* () {
        const updated = [];
        const productCheckPromises = products.map((_a) => __awaiter(this, [_a], void 0, function* ({ flavor, productId, qtd, size, price }) {
            const productData = yield models_1.Product.findById(productId);
            if (!productData) {
                return updated.push({
                    _id: productId,
                    size: "",
                    removed: "product",
                    flavor,
                });
            }
            const variant = productData.variants.find((v) => v.flavor.toLowerCase() === flavor.toLowerCase());
            if (!variant) {
                return updated.push({
                    _id: productId,
                    size: "",
                    flavor,
                    removed: "flavor",
                });
            }
            const sizeDetail = variant.sizeDetails.find((sd) => sd.size === size);
            if (!sizeDetail) {
                return updated.push({
                    _id: productId,
                    size: size,
                    flavor,
                    removed: "size",
                });
            }
            if (sizeDetail.stock < qtd) {
                return updated.push({
                    _id: productId,
                    size,
                    flavor,
                    updatedStock: sizeDetail === null || sizeDetail === void 0 ? void 0 : sizeDetail.stock,
                });
            }
            if (sizeDetail.price !== price) {
                return updated.push({
                    _id: productId,
                    size,
                    flavor,
                    updatedPrice: sizeDetail.price,
                });
            }
            if (buyer) {
                sizeDetail.stock -= qtd;
                yield models_1.Sell.create({
                    userId: buyer,
                    productId,
                    productSize: sizeDetail.size,
                    productFlavor: variant.flavor,
                    totalPrice: price,
                    qtd,
                });
                yield productData.save();
            }
        }));
        yield Promise.all(productCheckPromises);
        return updated;
    });
}
exports.default = updateCart;
