import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ErrorType } from "../types/response";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

interface PropsType {
  url: string;
  queryKey: string[];
  stop?: boolean;
}

export default function useScrollQuery<T>({ queryKey, url, stop }: PropsType) {
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchData = async (page: number) => {
    const symbol = url.includes("?") ? "&" : "?";
    const token = localStorage.getItem("token");

    const response: { hasMore: boolean; error: false } | ErrorType = await axios
      .get(`${import.meta.env.VITE_API_URL}/${url}${symbol}page=${page - 1}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

    if (response.error) {
      toast.error(response.message);
      return { error: true };
    }
    return response as T;
  };
  const { data, ...rest } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchData(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const oldPage = lastPage as { hasMore: boolean };
      return oldPage.hasMore && !stop ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const values = useMemo(() => {
    if (!data) return [];

    if (data?.pages.find((d: any) => d.error === true)) setHasError(true);
    const result = data.pages.reduce((acc: T[], curr: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hasMore, ...rest } = curr;
      const values = Object.values(rest)[0] as T[];
      const currArr = Array.isArray(values)
        ? values
        : (Array.from(values) as T[]);

      return [...acc, ...currArr];
    }, []);
    return result;
  }, [data]);

  useEffect(() => {
    if (!rest.isLoading && rest.hasNextPage) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !rest.isFetchingNextPage)
          rest.fetchNextPage();
      });
      if (ref.current) observer.current.observe(ref.current);
    }
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [rest.isFetchingNextPage, rest.hasNextPage, rest.fetchNextPage, rest]);

  return {
    ref,
    values,
    hasError,
    ...rest,
  };
}
