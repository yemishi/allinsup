"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const order_1 = __importDefault(require("./routes/order"));
const product_1 = __importDefault(require("./routes/product"));
const sell_1 = __importDefault(require("./routes/sell"));
const users_1 = __importDefault(require("./routes/users"));
const uploadImage_1 = __importDefault(require("./routes/uploadImage"));
router.use("/user", users_1.default);
router.use("/product", product_1.default);
router.use("/order", order_1.default);
router.use("/sell", sell_1.default);
router.use("/uploadImage", uploadImage_1.default);
exports.default = router;
