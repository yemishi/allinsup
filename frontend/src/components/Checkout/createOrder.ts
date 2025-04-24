import { toast } from "react-toastify";
import axiosRequest from "../../services/axios.config";
import { CartType } from "../../types/response";

export default async function createOrder(
  cart: CartType[],
  method: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  onFinally?: () => void,
  updateCart?: (updatedCart: CartType[]) => void,
  onFailed?: () => void
) {
  if (!cart.length) return;
  if (setLoading) setLoading(true);
  const transformedCart = cart.map((item) => ({
    productId: item._id,
    name: item.name,
    flavor: item.flavor,
    size: item.size,
    coverPhoto: item.coverPhoto,
    price: item.price,
    qtd: item.amount,
  }));

  const totalPrice = cart.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
  const methodMap = {
    cashOnDelivery: "Cash on delivery",
    card: "Card",
    amazon_pay: "Amazon pay",
    paypal: "PayPal",
  };
  const mappedMethod = methodMap[method as keyof typeof methodMap] || "";
  const response = await axiosRequest.order.create(transformedCart, totalPrice, (method = mappedMethod));

  if (response.error) {
    if (response.isUpdate) {
      const updatedCart = cart.filter((product) => {
        const { _id, flavor, size } = product;
        const findProduct = response.updated.find((i) => i._id === _id && i.flavor === flavor);
        if (!findProduct) return product;
        if (findProduct.removed === "product" || findProduct.removed === "variant") return;

        const findSize = response.updated.find((i) => i._id === _id && i.flavor === flavor && i.size === size);
        if (!findSize) return product;
        if (findSize.removed === "size") return;
        const { updatedPrice, updatedStock } = findSize;
        return {
          ...product,
          price: updatedPrice || product.price,
          stock: updatedStock || product.stock,
        };
      });
      if (updateCart) updateCart(updatedCart);
      if (setLoading) setLoading(false);
      toast.warn(response.message);
      return;
    } else {
      if (onFailed) onFailed();
      if (setLoading) setLoading(false);
      toast.error(response.message);
      return;
    }
  }

  toast.success(response.message);
  if (updateCart) updateCart([]);
  if (onFinally) onFinally();
}
