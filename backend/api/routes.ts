import express from "express";
const router = express();
import orderRouter from "../routes/order";
import productRouter from "../routes/product";
import sellRouter from "../routes/sell";
import userRouter from "../routes/users";
import uploadImage from "../routes/uploadImage";
import checkout from "../routes/checkout";

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/sell", sellRouter);
router.use("/uploadImage", uploadImage);
router.use("/stripe", checkout);

export default router;
