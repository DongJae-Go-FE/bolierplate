"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import queryString from "querystring";

export default function useFilter<T extends Record<string, string | number>>({
  initialState,
}: {
  initialState: T;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const getInitialFilter = (): T => {
    const urlParams = Object.fromEntries(searchParams.entries());
    return { ...initialState, ...urlParams } as T;
  };

  const [filter, setFilter] = useState<T>(getInitialFilter);
  const [query, setQuery] = useState<T>(getInitialFilter);

  useEffect(() => {
    const hasQueryParams = searchParams.toString().length > 0;

    if (!hasQueryParams) {
      replace(`${pathName}?${queryString.stringify(initialState)}`);
    }
  }, []);

  const handleFilterSubmit = () => {
    setQuery({ ...filter });
    replace(`${pathName}?${queryString.stringify(filter)}`);
  };

  const handleFilterReset = () => {
    setFilter(initialState);
    setQuery(initialState);
    replace(`${pathName}?${queryString.stringify(initialState)}`);
  };

  return { filter, setFilter, handleFilterSubmit, handleFilterReset, query };
}
