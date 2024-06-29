import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";
import CardGrid from "../../components/Card/CardGrid";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";
import { blinkVariant } from "../../utils/helpers";
import { Image } from "../../components";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") as string;
  const brand = searchParams.get("brand") as string;
  const category = searchParams.get("category") as string;
  const { ref, values, hasNextPage, isFetchingNextPage, isLoading } =
    useScrollQuery<ProductType>({
      queryKey: ["products", "search-page", query, brand, category],
      url: `/product?query=${query || ""}&brand=${brand || ""}&category=${
        category || ""
      }`,
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
          <br /> {query || brand || category}
        </h1>
      </div>
      {isLoading && (
        <Image src="/loading.svg" className="h-40 w-40 ml-auto mr-auto" />
      )}
      <CardGrid products={values} />
      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
