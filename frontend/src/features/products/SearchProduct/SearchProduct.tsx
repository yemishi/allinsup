import { useMemo, useEffect, useRef } from "react"
import { useInfiniteQuery } from "react-query"
import { axiosRequest, ProductGrid } from "../../../components"
import { waitingProduct } from "../../../utils"
import { ProductType } from "../../../types";

async function fetchProducts({ query = "", pageParam = 1 }) {
    const response = await axiosRequest.productsSearch(query, pageParam);
    return response.data;
}
export default function SearchProduct({ query }: { query: string }) {
    const observer = useRef<IntersectionObserver | null>(null);
    const ref = useRef<HTMLDivElement>(null)
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['productsSearch'],
        ({ pageParam }) => fetchProducts({ query, pageParam })
        ,
        {
            retry: 5
            ,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length ? allPages.length + 1 : undefined
            },
        }
    )

    useEffect(() => {
        if (!isLoading && hasNextPage) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isFetchingNextPage) {
                    fetchNextPage()
                }
            })
            if (ref.current) observer.current?.observe(ref.current)
        }
        return () => {
            if (observer.current) observer.current.disconnect();
        }
    }, [isLoading, hasNextPage, isFetchingNextPage])
    const products = useMemo(() => {
        if (data) {
            return data.pages.reduce((acc: ProductType[], page: ProductType[]) => {
                return [...acc, ...page];
            }, []);
        }
        return [];
    }, [data]);
    return (
        <div >
            <p className="font-lato m-4">Quantidade de produto: {products.length}</p>
            <ProductGrid products={products} />
            {(isLoading || isFetchingNextPage) && waitingProduct}
            {hasNextPage ? <div ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2 mt-3 rounded-t-2xl text-secondary-500 w-full text-center">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </div>
    )
}