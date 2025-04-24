import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";
import { blinkVariant } from "../../utils/helpers";;
import { Image } from "../../ui";

import { CardGrid } from "../../components";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const category = searchParams.get("category") ?? "";

  const [sortBy, setSortBy] = useState<"asc" | "des" | null>(null);
  const [isChose, setIsChose] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ulRef.current && !ulRef.current.contains(event.target as Node) && !divRef.current?.contains(event.target as Node)) {
      setIsChose(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const { ref, values, hasNextPage, isFetchingNextPage, isLoading } =
    useScrollQuery<ProductType>({
      queryKey: ["products", "search-page", query, brand, category, sortBy ?? ""],
      url: `/product?query=${query}&brand=${brand}&category=${category}&sort=${sortBy || ""}`,
    });

  const getSortValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.dataset.value as "asc" | "des" | undefined;
    setSortBy(value ?? null);
  };

  const sortOptions: { key: "asc" | "des"; label: string }[] = [
    { key: "asc", label: "Lowest price" },
    { key: "des", label: "Highest price" },
  ];

  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      variants={blinkVariant}
      transition={{ duration: 0.2 }}
      className="text-gray-200 overflow-hidden"
    >
      <div className="flex justify-between mt-7 px-2">
        <div className="font-lato pl-1 text-lg md:text-xl border-l-4 h-fit border-secondary-600 font-medium">
          <h1>
            Result of search:
            <br /> {query || brand || category}
          </h1>
        </div>

        {values.length > 0 && <div ref={divRef} className="text-base md:text-lg relative flex items-center gap-2 self-start">
          Sort by
          <span
            onClick={() => setIsChose(!isChose)}
            className="text-secondary-300 flex items-center gap-1 cursor-pointer"
          >
            {sortBy ? sortOptions.find((opt) => opt.key === sortBy)?.label : "Most relevant"}
            <IoIosArrowUp className={`h-6 w-6 ${isChose ? "rotate-0" : "rotate-180"} duration-150`} />
          </span>

          {isChose && (
            <motion.ul
              ref={ulRef}
              initial={{ top: 20, opacity: 0 }}
              animate={{ top: 42, opacity: 1 }}
              className="absolute right-0 bg-slate-200 rounded-md w-36 lg:w-40 divide-y divide-black
             text-black text-sm lg:text-base shadow-md shadow-black z-30"
            >
              <li
                onClick={() => setSortBy(null)}
                className={`p-3 border-secondary-400 hover:border-l-4 rounded-tl-md cursor-pointer ${!sortBy ? "border-l-2 text-secondary-400 font-semibold" : ""
                  }`}
              >
                Most relevant
              </li>
              {sortOptions.map(({ key, label }) => (
                <li
                  key={key}
                  onClick={getSortValue}
                  className={`p-3 border-secondary-400 hover:border-l-4 cursor-pointer ${sortBy === key ? "border-l-2 text-secondary-400 font-semibold" : ""
                    }`}
                  data-value={key}
                >
                  {label}
                </li>
              ))}
            </motion.ul>
          )}
        </div>}
      </div>

      {isLoading && <Image src="/loading.svg" className="h-40 w-40 ml-auto mr-auto" />}
      <CardGrid products={values} />
      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
