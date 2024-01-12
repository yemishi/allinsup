import { useEffect, useMemo, useRef } from "react";
import { ErrorPage } from "../features";
import { BrandType, ProductType } from "../types";
import { ProductGrid, axiosRequest } from "../components";
import { blinkVariant, waitingProduct } from "../utils";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"

export default function OptionMenu() {
    const { q } = useParams()

    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useRef<HTMLDivElement>(null)
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery(

        ['products'],
        async ({ pageParam }) => {
            const test: BrandType[] = ["black skull", "growth", "integralmédica", "max titanium", "probiotica"]
            if (test.find((e) => q === e)) {
                const response = await axiosRequest.productBrand(q as string, pageParam)
                return response.data
            }

            const response = await axiosRequest.productCategory(q as string, pageParam);
            return response.data;
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length ? allPages.length + 1 : undefined;
            },
        }
    );
    useEffect(() => {
        if (!isLoading && hasNextPage) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            });

            if (ref.current) observer.current.observe(ref.current);

        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const items = useMemo(() => {
        if (data) {
            return data.pages.reduce((acc: ProductType[], page: ProductType[]) => {
                return [...acc, ...page];
            }, []);
        }
        return [];
    }, [data]);

    if (error) return <ErrorPage msg="Algo deu errado aqui..." />
    return (
        <motion.div variants={blinkVariant} initial="initial" animate="animate" transition={{ duration: 0.2 }}
            className="w-full h-full justify-items-center pb-7 relative bg-primary-550 flex flex-col items-center">
            {items.length > 0 && <ProductGrid products={items} />}
            {isLoading && waitingProduct}
            {isFetchingNextPage && <span className=" w-11 h-11 py-3 border-4 border-y-transparent border-l-green-600 border-r-secondary-200
             rounded-full animate-spin" />}
            {hasNextPage ? <div ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2  rounded-2xl text-secondary-500 w-3/6 mt-4 text-center">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </motion.div>
    )
}