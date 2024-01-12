import { useMemo, useEffect, useRef } from "react";
import { ProductType } from "../../../types";
import { useInfiniteQuery } from "react-query";
import { axiosRequest, ProductGrid } from "../../../components";
import { waitingProduct } from "../../../utils";
import { useGlobalState } from "../../../App";
import { ErrorPage } from "../..";


async function fetchProducts({ brand = "", pageParam = 1 }) {
    const response = await axiosRequest.productBrand(brand === "Diversas" ? "" : brand, pageParam);
    return response.data;
}

export default function ProductProvider() {
    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useRef<HTMLDivElement>(null)
    const { state } = useGlobalState()
    const { data, refetch, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery(
        ['products', state.brandHome],
        ({ pageParam }) => {
            return fetchProducts({ brand: state.brandHome, pageParam })
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length ? allPages.length + 1 : undefined;
            },
        }
    );

    useEffect(() => {
        refetch();
    }, [state.brandHome, refetch]);

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
    
    if (error) return <ErrorPage msg="Algo deu errado, tente novamente."/>

    return (
        <div className="w-full h-full justify-items-center pb-7 relative bg-primary-550 flex flex-col items-center">
            {items.length > 0 && <ProductGrid products={items} />}
            {isLoading && waitingProduct}
            {isFetchingNextPage && <span className=" w-11 h-11 py-3 border-4 border-y-transparent border-l-green-600 border-r-secondary-200 rounded-full animate-spin" />}
            {hasNextPage ? <div  ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2  rounded-2xl text-secondary-500 w-3/6 mt-4 text-center lg:text-lg lg:w-auto lg:p-4 lg:mt-6 lg:px-7">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </div>
    );
}
