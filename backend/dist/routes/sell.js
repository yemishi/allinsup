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
router.get("/", utils_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sellId, page = 0, limit = 10, productId, userId } = req.query;
        const { email } = req.user;
        const userData = yield models_1.User.findOne({ email });
        if (!userData || !userData.isAdmin)
            return res.status(404).json({ error: true, message: "User not found." });
        if (sellId) {
            const sellData = yield models_1.Sell.findById(sellId);
            if (!sellData)
                return res
                    .status(404)
                    .json({ error: true, message: "Sell not found." });
            return res.status(200).json(sellData);
        }
        const offset = Number(page) * Number(limit);
        const filter = {};
        if (userId) {
            filter.userId = { $regex: userId, $options: "i" };
        }
        if (productId) {
            filter.productId = { $regex: productId, $options: "i" };
        }
        const count = yield models_1.Sell.countDocuments(filter);
        const sells = yield models_1.Sell.find(filter).skip(offset).limit(Number(limit));
        return res
            .status(200)
            .json({ sells, hasMore: count > offset + Number(limit) });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "We had a problem trying to fetch the sell.",
        });
    }
}));
exports.default = router;
