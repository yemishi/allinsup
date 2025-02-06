"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const handleImage_1 = __importStar(require("../firebase/handleImage"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file)
            return res.json({ error: true, message: "File is required" });
        const url = yield (0, handleImage_1.default)(file);
        return res.json({ url });
    }
    catch (error) {
        return res.json({ error: true, message: "We had a problem" });
    }
}));
router.post("/many", upload.array("files[]"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (!files)
            return res.json({ error: true, message: "Files is required" });
        const urlsPromise = files.map((file) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, handleImage_1.default)(file); }));
        const urls = yield Promise.all(urlsPromise);
        return res.json({ urls });
    }
    catch (error) {
        return res.json({ error: true, message: "We had a problem" });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        yield (0, handleImage_1.deleteImage)(url);
        return res.json({ message: "image deleted with success" });
    }
    catch (error) {
        return res.json({ error: true, message: "We had a problem" });
    }
}));
router.delete("/many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { urls } = req.body;
        const PromiseDelete = urls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, handleImage_1.deleteImage)(url);
        }));
        yield Promise.all(PromiseDelete);
        return res.json({ message: "Images deleted with success" });
    }
    catch (error) {
        return res.json({ error: true, message: "We had a problem" });
    }
}));
exports.default = router;
