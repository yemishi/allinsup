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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const models_1 = require("../models");
const router = (0, express_1.default)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, page = 0, limit = 10, query = "" } = req.query;
        if (productId) {
            const product = yield models_1.Product.findById(productId);
            return res.json(product);
        }
        const filter = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { "variants.flavor": { $regex: query, $options: "i" } },
                { "variants.sizeDetails.size": { $regex: query, $options: "i" } },
            ],
        };
        const offset = Number(limit) * Number(page);
        const productsTotal = yield models_1.Product.countDocuments(filter);
        const productsData = yield models_1.Product.find(filter)
            .skip(offset)
            .limit(Number(limit));
        const hasMore = offset + Number(limit) < productsTotal;
        const products = (0, utils_1.search)(productsData, query);
        return res.json({ products, hasMore });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message: "We had a problem trying to get the product",
        });
    }
}));
router.post("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, category, brand, variants } = req.body();
        const { email } = req.user;
        const user = yield models_1.User.findOne({ email });
        if (!(user === null || user === void 0 ? void 0 : user.isAdmin))
            return res.json({
                error: true,
                message: "Action is not allowed for the user",
            });
        yield models_1.Product.create({ name, desc, category, brand, variants });
        return res.json({ message: "Product created with success" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to create the product.",
        });
    }
}));
router.patch("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        const { variants, desc, name, productId } = req.body();
        const userData = yield models_1.User.findOne({ email });
        if (!userData || !userData.isAdmin)
            return res.json({ error: true, message: "User not found" });
        const product = yield models_1.Product.findById(productId);
        if (!product)
            return res.json({ error: true, message: "Product not found" });
        if (variants)
            product.variants = variants;
        if (name)
            product.name = name;
        if (desc)
            product.desc = desc;
        yield product.save();
        return res.json({ message: "Product updated with success" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to updated the product",
        });
    }
}));
router.delete("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        const { productId } = req.body();
        const userData = yield models_1.User.findOne({ email });
        if (!userData || !userData.isAdmin)
            return res.json({ error: true, message: "User not found." });
        if (!productId)
            return res.json({ error: true, message: "Product id is required." });
        yield models_1.Product.findByIdAndDelete(productId);
        return res.json({ message: "Product deleted with success." });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to delete the product.",
        });
    }
}));
exports.default = router;
