import { Product, Sell } from "../models";

type CartType = {
  flavor: string;
  productId: string;
  size: string;
  qtd: number;
  price: number;
};

export default async function updateCart(
  products: CartType[],
  buyer?: string
) {
  const updated: {
    _id: string;
    size: string;
    flavor: string;
    removed?: "size" | "product" | "flavor";
    updatedStock?: number;
    updatedPrice?: number;
  }[] = [];

  const productCheckPromises = products.map(
    async ({ flavor, productId, qtd, size, price }) => {
      const productData = await Product.findById(productId);
      if (!productData) {
        return updated.push({
          _id: productId,
          size: "",
          removed: "product",
          flavor,
        });
      }
      const variant = productData.variants.find(
        (v) => v.flavor.toLowerCase() === flavor.toLowerCase()
      );
      if (!variant) {
        return updated.push({
          _id: productId,
          size: "",
          flavor,
          removed: "flavor",
        });
      }

      const sizeDetail = variant.sizeDetails.find((sd) => sd.size === size);
      if (!sizeDetail) {
        return updated.push({
          _id: productId,
          size: size,
          flavor,
          removed: "size",
        });
      }
      if (sizeDetail.stock < qtd) {
        return updated.push({
          _id: productId,
          size,
          flavor,
          updatedStock: sizeDetail?.stock,
        });
      }
      if (sizeDetail.price !== price) {
        return updated.push({
          _id: productId,
          size,
          flavor,
          updatedPrice: sizeDetail.price,
        });
      }
      if (buyer) {
        sizeDetail.stock -= qtd;
        await Sell.create({
          userId:buyer,
          productId,
          productSize: sizeDetail.size,
          productFlavor: variant.flavor,
          totalPrice: price,
          qtd,
        });
        await productData.save();
      }
    }
  );
  await Promise.all(productCheckPromises);
  return updated;
}
