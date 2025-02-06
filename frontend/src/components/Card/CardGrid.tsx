import Card from "./Card";
import { ProductType } from "../../types/response";
import { useCart } from "../../context/Provider";
import { productDetails } from "../../utils/helpers";
import CardSkeleton from "./CardSkeleton";

export default function CardGrid({
  products,
  isLoading,
  sortBy,
}: {
  products: ProductType[];
  isLoading?: boolean;
  sortBy?: "asc" | "des"
}) {
  const { cart, updateCart } = useCart();
  const organizedItems = products.map((product) => productDetails(product, cart)).sort((a, b) => {
    const priceA = a.promotion ?? a.price
    const priceB = b.promotion ?? b.price
    return sortBy === "des" ? priceA - priceB : priceA + priceB;
  })

  return (
    <div className="w-full h-full flex flex-wrap justify-evenly px-1 gap-4 py-3 font-lato text-sm md:text-base lg:text-lg">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
          <CardSkeleton key={`card-${index}`} />
        ))
        : organizedItems.map(({ _id, amount, coverPhoto, flavor, name, price, promotion, size, stock }, index) => {
          const props = {
            _id,
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
              key={`${name}_${_id}_${index}`}
              addToCart={addToCart}
              props={props}
            />
          );
        })}
    </div>
  );
}
