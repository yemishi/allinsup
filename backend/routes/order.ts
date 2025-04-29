import express from "express";
import { Order, Product, Sell, User } from "../models";
import { authToken } from "../utils";
import updateCart from "../utils/updateCart";
const router = express();

router.get("/", authToken, async (req, res) => {
  try {
    const { orderId, page = 0, limit = 10 } = req.query;
    const { email } = req.user;
    const userData = await User.findOne({ email });
    if (!userData) return res.json({ error: true, message: "User not found." });

    if (orderId) {
      const order = await Order.findOne({ orderId });
      if (!order || String(order.user.userId) !== String(userData._id)) {
        return res.json({ error: true, message: "Order not found." });
      }
      return res.json(order);
    }

    const offset = Number(page) * Number(limit);
    const count = await Order.countDocuments({ "user.userId": String(userData.id) });
    const orders = await Order.find({ "user.userId": String(userData.id) })
      .skip(offset)
      .limit(Number(limit));
    return res.json({ orders, hasMore: offset + Number(limit) < count });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to recover the product info.",
    });
  }
});

router.get("/admin", authToken, async (req, res) => {
  try {
    const { page = 0, limit = 10, query = "" } = req.query;
    const { email } = req.user;

    const userData = await User.findOne({ email });
    if (!userData || !userData.isAdmin) return res.json({ error: true, message: "User not found." });

    const offset = Number(page) * Number(limit);

    const filter = {
      $or: [
        { status: { $regex: query, $options: "i" } },
        { method: { $regex: query, $options: "i" } },
        { "user.name": { $regex: query, $options: "i" } },
        { "user.email": { $regex: query, $options: "i" } },
        { orderId: { $regex: query, $options: "i" } },
      ],
    };

    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter).skip(offset).limit(Number(limit));

    return res.json({ orders, hasMore: offset + Number(limit) < count });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: "We had a problem trying to recover the product info.",
    });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const { products, totalPaid, method } = req.body as {
      products: {
        qtd: number;
        name: string;
        flavor: string;
        size: string;
        price: number;
        productId: string;
        coverPhoto: string;
      }[];
      totalPaid: number;
      method: string;
    };
    const { email, name } = req.user;
    const userData = await User.findOne({ email });

    if (!userData) return res.json({ error: true, message: "User not found." });
    const updated = await updateCart(products, userData._id as string);

    if (updated.length > 0)
      return res.json({
        error: true,
        isUpdate: true,
        updated,
        message: "Some items in your cart have been updated.",
      });

    const productPromises = products.map(async ({ flavor, productId, qtd, size, price }) => {
      const productData = await Product.findById(productId);

      const variant = productData?.variants.find((v) => v.flavor.toLowerCase() === flavor.toLowerCase());

      const sizeDetail = variant?.sizeDetails.find((sd) => sd.size === size);
      if (!sizeDetail)
        return res.json({
          error: true,
          message: "We had a error trying to complete the purchase.",
        });

      sizeDetail.stock -= qtd;
      await Sell.create({
        userId: userData.id,
        productId,
        productSize: sizeDetail?.size,
        productFlavor: variant?.flavor,
        totalPrice: price,
        qtd,
      });
      await productData?.save();
    });
    await Promise.all(productPromises);
    const generateOrderId = () => {
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
      return `${datePart}-${randomPart}`;
    };

    await Order.create({
      user: { userId: userData.id, email, name },
      purchaseDate: new Date(),
      orderId: generateOrderId(),
      address: userData.address,
      status: "pending",
      method,
      totalPaid,
      products,
    });
    return res.json({ message: "Order created with success." });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to create the order.",
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { status, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.json({ error: true, message: "Order not found." });

    if (status.toLowerCase() === "delivered") order.receivedDate = new Date();
    order.status = status;
    await order.save();
    return res.json({ message: "Order updated with success." });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to updated the order.",
    });
  }
});
export default router;
