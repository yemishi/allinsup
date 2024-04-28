import express from "express";
import { authToken } from "../utils";
import { Sell, User } from "../models";

const router = express();

router.get("/", authToken, async (req, res) => {
  try {
    const { sellId, page = 0, limit = 10, productId, userId } = req.query;
    const { email } = req.user;
    const userData = await User.findOne({ email });
    if (!userData || !userData.isAdmin)
      return res.status(404).json({ error: true, message: "User not found." });

    if (sellId) {
      const sellData = await Sell.findById(sellId);
      if (!sellData)
        return res
          .status(404)
          .json({ error: true, message: "Sell not found." });
      return res.status(200).json(sellData);
    }
    const offset = Number(page) * Number(limit);
    const filter: any = {};

    if (userId) {
      filter.userId = { $regex: userId, $options: "i" };
    }

    if (productId) {
      filter.productId = { $regex: productId, $options: "i" };
    }

    const count = await Sell.countDocuments(filter);
    const sells = await Sell.find(filter).skip(offset).limit(Number(limit));
    return res
      .status(200)
      .json({ sells, hasMore: count > offset + Number(limit) });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "We had a problem trying to fetch the sell.",
    });
  }
});

export default router;
