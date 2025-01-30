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
const models_1 = require("../models");
const utils_1 = require("../utils");
const updateCart_1 = __importDefault(require("../utils/updateCart"));
const router = (0, express_1.default)();
router.get("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, page = 0, limit = 10 } = req.query;
        const { email } = req.user;
        const userData = yield models_1.User.findOne({ email });
        if (!userData)
            return res.json({ error: true, message: "User not found." });
        if (orderId) {
            const order = yield models_1.Order.findById(orderId);
            if (String(order === null || order === void 0 ? void 0 : order.userId) !== String(userData._id))
                return res.json({ error: true, message: "Order not found" });
            return res.json(order);
        }
        const offset = Number(page) * Number(limit);
        const count = yield models_1.Order.countDocuments({ userId: userData.id });
        const orders = yield models_1.Order.find({ userId: userData.id })
            .skip(offset)
            .limit(Number(limit));
        return res.json({ orders, hasMore: offset + Number(limit) < count });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to recover the product info.",
        });
    }
}));
router.get("/admin", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 0, limit = 10, query = "" } = req.query;
        const { email } = req.user;
        const userData = yield models_1.User.findOne({ email });
        if (!userData || !userData.isAdmin)
            return res.json({ error: true, message: "User not found." });
        const offset = Number(page) * Number(limit);
        const filter = {
            $or: [
                { status: { $regex: query, $options: "i" } },
                { method: { $regex: query, $options: "i" } },
            ],
        };
        const count = yield models_1.Order.countDocuments(filter);
        const orders = yield models_1.Order.find(filter).skip(offset).limit(Number(limit));
        const ordersUpdated = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            const userData = yield models_1.User.findById(order.userId);
            if (!userData) {
                order.user = {
                    isDeleted: true,
                };
                return order;
            }
            order.user = {
                name: userData.name,
                email: userData.email,
                isDeleted: false,
            };
            return order;
        })));
        return res.json({ ordersUpdated, hasMore: offset + Number(limit) < count });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to recover the product info.",
        });
    }
}));
router.post("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, totalPaid, method } = req.body;
        const { email } = req.user;
        const userData = yield models_1.User.findOne({ email });
        if (!userData)
            return res.json({ error: true, message: "User not found." });
        const updated = yield (0, updateCart_1.default)(products, userData._id);
        if (updated.length > 0)
            return res.json({
                error: true,
                isUpdate: true,
                updated,
                message: "Some items in your cart have had an updated.",
            });
        const productPromises = products.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ flavor, productId, qtd, size, price }) {
            const productData = yield models_1.Product.findById(productId);
            const variant = productData === null || productData === void 0 ? void 0 : productData.variants.find((v) => v.flavor.toLowerCase() === flavor.toLowerCase());
            const sizeDetail = variant === null || variant === void 0 ? void 0 : variant.sizeDetails.find((sd) => sd.size === size);
            if (!sizeDetail)
                return res.json({
                    error: true,
                    message: "We had a error trying to complete the purchase.",
                });
            sizeDetail.stock -= qtd;
            yield models_1.Sell.create({
                userId: userData.id,
                productId,
                productSize: sizeDetail === null || sizeDetail === void 0 ? void 0 : sizeDetail.size,
                productFlavor: variant === null || variant === void 0 ? void 0 : variant.flavor,
                totalPrice: price,
                qtd,
            });
            yield (productData === null || productData === void 0 ? void 0 : productData.save());
        }));
        yield Promise.all(productPromises);
        yield models_1.Order.create({
            userId: userData.id,
            purchaseDate: new Date(),
            address: userData.address,
            status: "pending",
            method,
            totalPaid,
            products,
        });
        return res.json({ message: "Order created with success." });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to create the order.",
        });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, orderId } = req.body;
        const order = yield models_1.Order.findById(orderId);
        if (!order)
            return res.json({ error: true, message: "Order not found." });
        if (status.toLowerCase() === "delivered")
            order.receivedDate = new Date();
        order.status = status;
        yield order.save();
        return res.json({ message: "Order updated with success." });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to updated the order.",
        });
    }
}));
exports.default = router;
