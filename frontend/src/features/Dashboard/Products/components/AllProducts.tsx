import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query"
import { axiosRequest, toast } from "../../../../components";
import { ProductType } from "../../../../types";
import { productDetails } from "../../../../utils";

async function fetchProducts({ query = "", pageParam = 1 }) {
    const response = await axiosRequest.productsSearch(query, pageParam);
    return response.data;
}

export default function AllProducts({ query, action, setForm, setVisible }: {
    query: string, action: string, setForm: Dispatch<SetStateAction<ProductType | undefined>>, setVisible: Dispatch<SetStateAction<boolean>>
}) {


    const observer = useRef<IntersectionObserver | null>(null);
    const ref = useRef<HTMLDivElement>(null)

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['productsSearch', query],
        ({ pageParam }) => fetchProducts({ query, pageParam })
        ,
        {
            retry: 51
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

    const fetchProduct = async (flavor: string, sizeProduct: string, _id: string): Promise<void> => {
        try {

            const response = await axiosRequest.productInfo(flavor, sizeProduct, _id)
            setForm(response.data)
            setVisible(true)
        } catch (error) {
            toast.error("produto não encontrado no sistema")
        }
    }

    const products = useMemo(() => {
        if (data) {
            return data.pages.reduce((acc: ProductType[], page: ProductType[]) => {
                return [...acc, ...page];
            }, []);
        }
        return [];
    }, [data]);

    return (
        <div className="flex flex-wrap text-gray-200 gap-4 items-center justify-center">
            {products && products.map((product) => {
                const { _id, coverPhoto, flavor, name,
                    sizeProduct, updatedName, } = productDetails(product, [])
                return <div className="flex flex-col gap-3 w-44 overflow-hidden h-72 bg-primary-550 rounded-lg" key={`${_id}_${name}`}>
                    <div className=" h-40 flex p-2 bg-white rounded-lg">
                        <img src={coverPhoto} className="w-full object-contain" alt="" />
                    </div>
                    <div className="w-full pl-2 pr-1">
                        <p className="font-lato font-semibold text-sm">{updatedName}</p>
                    </div>
                    <button onClick={() => fetchProduct(flavor, sizeProduct, _id)} className="mt-auto bg-secondary-700 p-1 rounded-b-lg font-semibold font-anton ">{action}</button>
                </div>
            })}

            {hasNextPage ? <div ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2 mt-3 rounded-t-2xl text-secondary-500 w-full text-center">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </div>
    )
}