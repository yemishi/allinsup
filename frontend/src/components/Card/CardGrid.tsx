import Card from "./Card";
import { ProductType } from "../../types/response";
import { useCart } from "../../context/Provider";
import { productDetails } from "../../utils/helpers";
import CardSkeleton from "./CardSkeleton";

export default function CardGrid({
  products,
  isLoading,
}: {
  products: ProductType[];
  isLoading?: boolean;
}) {
  const { cart, updateCart } = useCart();

  return (
    <div className="w-full h-full flex flex-wrap justify-evenly px-1 gap-4 py-3 font-lato text-sm md:text-base lg:text-lg">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={`card-${index}`} />
          ))
        : products.map((product, index) => {
            const {
              amount,
              coverPhoto,
              name,
              flavor,
              price,
              promotion,
              size,
              stock,
            } = productDetails(product, cart);

            const props = {
              _id: product._id,
              amount,
              coverPhoto,
              flavor,
              name,
              price,
              size,
              stock,
              promotion,
            };

            const addToCart = () => {
              if (amount === 0) {
                return updateCart([...cart, { ...props, amount: 1 }]);
              }
              const newCart = cart.map((values) => {
                if (
                  values._id === props._id &&
                  values.flavor === props.flavor &&
                  values.size === props.size
                ) {
                  values.amount += 1;
                  return values;
                }
                return values;
              });
              updateCart(newCart);
            };
            return (
              <Card
                key={`${product}_${product._id}_${index}`}
                addToCart={addToCart}
                props={props}
              />
            );
          })}
    </div>
  );
}
