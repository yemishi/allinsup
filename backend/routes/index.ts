import express from "express";
const router = express();
import orderRouter from "./order";
import productRouter from "./product";
import sellRouter from "./sell";
import userRouter from "./users";
import uploadImage from "./uploadImage";
import checkout from "./checkout";

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/sell", sellRouter);
router.use("/uploadImage", uploadImage);
router.use("/stripe", checkout);

export default router;
