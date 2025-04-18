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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const models_1 = require("../models");
const index_1 = require("../utils/index");
const router = (0, express_1.default)();
router.get("/", index_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        if (!email)
            return res.json({ error: true, message: "User not found" });
        const user = yield models_1.User.findOne({ email }).select([
            "name",
            "email",
            "address",
            "isAdmin",
        ]);
        if (!user)
            return res.json({ error: true, message: "User not found" });
        return res.json(user);
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to update the user info",
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }
        const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: true, message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ email, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: "1m",
        });
        return res.json({ token, message: `Welcome ${user.name}` });
    }
    catch (error) { }
    return res.json({
        error: true,
        message: "We had a problem trying to get the user info.",
    });
}));
router.get("/test", index_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.user;
        return res.json({ email, name });
    }
    catch (error) {
        return res.json({ error: true });
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const existingEmail = yield models_1.User.findOne({ email });
        if (existingEmail)
            return res.json({
                error: true,
                message: "Email already being used",
            });
        const hashedPass = (0, bcrypt_1.hashSync)(password, 10);
        yield models_1.User.create({ email, password: hashedPass, name });
        return res.json({ message: "User created with success" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to create the user account",
        });
    }
}));
router.delete("/delete", index_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.user;
        const userData = yield models_1.User.findOne({ email, name });
        if (!userData)
            return res.json({ error: true, message: "User not found" });
        yield models_1.Order.deleteMany({ userId: userData.id });
        yield models_1.User.deleteOne({ email, name });
        return res.json({ message: "User deleted with success" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to delete the user account",
        });
    }
}));
router.patch("/", index_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, address, name } = req.body;
        const { email } = req.user;
        if (!email)
            return res.json({ error: true, message: "User not found" });
        const updateData = {};
        if (name)
            updateData.name = name;
        if (address)
            updateData.address = address;
        if (password) {
            const hashedPass = (0, bcrypt_1.hashSync)(password, 10);
            updateData.password = hashedPass;
        }
        yield models_1.User.findOneAndUpdate({ email }, updateData);
        return res.json({ message: "User updated successfully" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to update the user info",
        });
    }
}));
router.patch("/upgrade", index_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        if (!email)
            return res.json({ error: true, message: "User not found" });
        yield models_1.User.findOneAndUpdate({ email }, {
            $set: { isAdmin: true },
        });
        return res.json({ message: "User upgraded successfully" });
    }
    catch (error) {
        return res.json({
            error: true,
            message: "We had a problem trying to upgrade the user info",
        });
    }
}));
exports.default = router;
