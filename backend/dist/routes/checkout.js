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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.default)();
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
router.post("/checkout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { line_items, method } = req.body;
    const token = jsonwebtoken_1.default.sign({ method }, process.env.JWT_SECRET, { expiresIn: "20m" });
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: [method],
            line_items,
            mode: "payment",
            success_url: `${process.env.APP_URL}/checkout?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
            cancel_url: `${process.env.APP_URL}/checkout?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
        });
        res.json({ id: session.id });
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        return res.json({
            error: true,
            message: "We had a problem in an attempt to make a purchase.",
        });
    }
}));
router.get("/confirm-payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.query.session_id;
    const token = req.query.token;
    if (!sessionId || !token)
        return res.status(400).json({ success: false, message: "Missing queries", error: true });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const session = yield stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid") {
            res.json({ success: true, message: "Payment successful", paymentStatus: session.payment_status, method: decoded.method });
        }
        else {
            res.json({ success: false, message: "Payment not successful", paymentStatus: session.payment_status });
        }
    }
    catch (error) {
        console.error("Error confirming payment:", error);
        res.json({ success: false, message: error.message });
    }
}));
exports.default = router;
