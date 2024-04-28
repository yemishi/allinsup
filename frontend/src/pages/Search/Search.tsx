import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";
import CardGrid from "../../components/Card/CardGrid";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";
import { blinkVariant } from "../../utils/helpers";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") as string;
  const brand = searchParams.get("brand") as string;
  const category = searchParams.get("category") as string;
  const { ref, values, hasNextPage, isFetchingNextPage } =
    useScrollQuery<ProductType>({
      queryKey: ["products", "search-page", query],
      url: `/product?query=${query}&brand=${brand}&category=${category}`,
    });

  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      variants={blinkVariant}
      transition={{ duration: 0.2 }}
      className="text-gray-200  overflow-hidden"
    >
      <div className="font-lato pl-1 text-xl border-l-4 border-secondary-600 mt-7  font-medium m-4 ">
        <h1>
          Result of search:
          <br /> {query}
        </h1>
      </div>
      <CardGrid products={values} />
      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
