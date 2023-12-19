import {useEffect, useState} from "react";
import {createSearchParams, useSearchParams} from "react-router-dom";

const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(() => searchParams.get('page') || '1');

    const queryParams = {
        page: !isNaN(+page) ? page : '1',
    }

    const handleChangeParams = (currentPage = 1) => {
        setPage(String(currentPage));
    };

    useEffect(() => {
        setSearchParams(`?${createSearchParams(queryParams).toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return {
        page,
        params: {...queryParams, per_page: '10'},
        handleChangeParams,
    }
};

export default useQueryParams;
