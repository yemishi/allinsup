import { Children, useEffect, useRef, useState } from "react"
import axios from "axios"
import ProductGrid from "./ProductGrid"
import { ProductType } from "../../../types"

export default function ProductProvider() {

    const [products, setProducts] = useState<ProductType[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get<ProductType[]>(`http://localhost:3000/products?page=${currentPage}`);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setProducts(prevData => {
                    const existingProductIds = new Set(prevData.map(product => product._id));
                    const filteredNewProducts = data.filter(product => !existingProductIds.has(product._id));

                    return [...prevData, ...filteredNewProducts];
                })
            };
        }
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setCurrentPage((page) => page + 1)
            }
        })
        if (ref.current) intersectionObserver.observe(ref.current);
        return () => intersectionObserver.disconnect();
    }, []);

    return <div className="w-full h-full justify-items-center bg-primary-550 flex flex-col items-center">
        {products.length > 0 && <ProductGrid products={products} />}
        {hasMore && <div className="bg-red-300 absolute  w-full bottom-0 text-cyan-50" ref={ref} />}
    </div>
}