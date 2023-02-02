import { useAppSelector } from '../../../hooks/redux';
import { useState } from 'react';
import { pageSize } from './helper';
import { useMemo } from 'react';


const useContents = () => {
    const { error, users } = useAppSelector(
        (state) => state.userReducer
    );
    // ================================================================
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, users]);
    // ====================================================================
    
    return {
        error,
        users,
        currentTableData,
        currentPage,
        setCurrentPage,
        pageSize
    }
}

export default useContents;