import { useMemo, useEffect, useRef } from "react";
import { ProductType } from "../../../types";
import { useInfiniteQuery } from "react-query";
import { axiosRequest, ProductGrid } from "../../../components";
import { waitingProduct } from "../../../utils";
import { useGlobalState } from "../../../App";


async function fetchProducts({ brand = "", pageParam = 1 }) {
    const response = await axiosRequest.productBrand(brand === "Diversas" ? "" : brand, pageParam);
    return response.data;
}

export default function ProductProvider() {
    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useRef<HTMLDivElement>(null)
    const { state } = useGlobalState()
    const { data, refetch, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
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

    return (
        <div className="w-full h-full justify-items-center bg-primary-550 pb-6 flex flex-col items-center">
            {items.length > 0 && <ProductGrid products={items} />}
            {(isLoading || isFetchingNextPage) && waitingProduct}
            {hasNextPage ? <div ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2 absolute  bottom-0 rounded-t-2xl text-secondary-500 w-full text-center">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </div>
    );
}
