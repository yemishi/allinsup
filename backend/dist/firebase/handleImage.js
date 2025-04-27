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
exports.deleteImage = void 0;
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("./firebase.config");
const promises_1 = __importDefault(require("fs/promises"));
function uploadImg(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileRef = (0, storage_1.ref)(firebase_config_1.analytics, `images/${file.originalname.split(".")[0]}?uploadAt=${new Date().getTime()}`);
            const fileBuffer = yield promises_1.default.readFile(file.path);
            const metadata = {
                contentType: file.mimetype,
            };
            const upload = yield (0, storage_1.uploadBytes)(fileRef, fileBuffer, metadata).then((res) => (0, storage_1.getDownloadURL)(res.ref).then((url) => url));
            return upload;
        }
        catch (error) {
            return {
                error: true,
                message: "We had a problem trying to upload the image.",
            };
        }
    });
}
exports.default = uploadImg;
function deleteImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileRef = (0, storage_1.ref)(firebase_config_1.analytics, url);
            const test = yield (0, storage_1.deleteObject)(fileRef);
            console.log(test);
            return {
                message: "Image deleted with success",
            };
        }
        catch (error) {
            return {
                error: true,
                message: "we had a problem trying to delete the image",
            };
        }
    });
}
exports.deleteImage = deleteImage;
