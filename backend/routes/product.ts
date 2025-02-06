import express from "express";
import { authToken, search } from "../utils";
import { Order, Product, User } from "../models";
import { ProductType, VariantType } from "../types/types";
import { deleteImage } from "../firebase/handleImage";
const router = express();

router.get("/", async (req, res) => {
  try {
    const {
      productId,
      page = 0,
      limit = 10,
      query = "",
      brand,
      category,
      sort,
    } = req.query;
    if (productId) {
      const product = await Product.findById(productId);
      return res.json(product);
    }
    const filter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { "variants.flavor": { $regex: query, $options: "i" } },
        { "variants.sizeDetails.size": { $regex: query, $options: "i" } },
      ],
    } as any;
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }
    if (category) filter.category = { $regex: category, $options: "i" };
    const offset = Number(limit) * Number(page);


    const productsTotal = await Product.countDocuments(filter);
    const hasMore = offset + Number(limit) < productsTotal;
    if (sort) {
      const sortDirection = sort === "asc" ? 1 : -1;

      const productsData = await Product.aggregate([
        { $match: filter },
        { $unwind: "$variants" },
        { $unwind: "$variants.sizeDetails" },
        {
          $addFields: {
            priceToSort: {
              $cond: {
                if: { $gt: ["$variants.sizeDetails.promotion", 0] },
                then: "$variants.sizeDetails.promotion",
                else: "$variants.sizeDetails.price",
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            brand: { $first: "$brand" },
            category: { $first: "$category" },
            desc: { $first: "$desc" },
            variants: { $push: "$variants" },
            minPrice: { $min: "$priceToSort" },
          }
        },
        { $sort: { minPrice: sortDirection } },
        { $skip: offset },
        { $limit: Number(limit) }
      ]);
      return res.json({ products: productsData, hasMore });
    }
    const productsData = await Product.find(filter)
      .skip(offset)
      .limit(Number(limit));
    const products = search(productsData, query as string) as ProductType[];
    return res.json({ products, hasMore });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to get the product",
    });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const { name, desc, category, brand, variants } = req.body as ProductType;
    const { email } = req.user;

    variants.map((variant) => {
      variant.photos.length === 0;
      variant.photos.push(process.env.DEFAULT_PRODUCT_PHOTO as string);
    });
    const user = await User.findOne({ email });
    if (!user?.isAdmin)
      return res.json({
        error: true,
        message: "Action is not allowed for the user",
      });
    await Product.create({ name, desc, category, brand, variants });
    return res.json({ message: "Product created with success" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to create the product.",
    });
  }
});

router.patch("/", authToken, async (req, res) => {
  try {
    const { email } = req.user;
    const { productId, product, photosDelete } = req.body;
    product.variants.map((variant: VariantType) => {
      if (variant.photos.length === 0)
        variant.photos.push(process.env.DEFAULT_PRODUCT_PHOTO as string);
    });

    const userData = await User.findOne({ email });
    if (!userData || !userData.isAdmin)
      return res.json({ error: true, message: "User not found" });
    const productData = await Product.findByIdAndUpdate(productId, product);
    if (photosDelete) {
      await Promise.all(
        photosDelete.map(async (photo: string) => {
          await deleteImage(photo);
        })
      );
    }
    if (!productData)
      return res.json({ error: true, message: "Product not found" });

    return res.json({ message: "Product updated with success" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to updated the product",
    });
  }
});

router.delete("/", authToken, async (req, res) => {
  try {
    const { email } = req.user;
    const { productId } = req.query;
    const userData = await User.findOne({ email });

    if (!userData || !userData.isAdmin)
      return res.json({ error: true, message: "User not found." });

    if (!productId)
      return res.json({ error: true, message: "Product id is required." });

    const orders = await Order.find({
      products: {
        $elemMatch: {
          productId,
        },
      },
    });

    const orderPromise = orders.map(async (order) => {
      order.products.map((product) => {
        if (product.productId === productId) {
          product.coverPhoto = process.env.DEFAULT_PRODUCT_PHOTO as string;
        }
      });
      await order.save();
    });
    await Promise.all(orderPromise);
    await Product.findByIdAndDelete(productId);
    return res.json({ message: "Product deleted with success." });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to delete the product.",
    });
  }
});

router.get("/highlight", async (req, res) => {
  try {
    const { page = 0, limit = 10 } = req.query;

    const filter = {
      "variants.sizeDetails": {
        $elemMatch: { isHighlight: true },
      },
    };
    const offset = Number(limit) * Number(page);
    const productsTotal = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(offset)
      .limit(Number(limit));
    const hasMore = offset + Number(limit) < productsTotal;

    return res.json({ products, hasMore });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to get the product",
    });
  }
});

export default router;
