import { useMemo } from "react";

export const usePagesArray = (totalPages, page, posts, filter) => {
    const pagesArray = [];
    const getPagesArray = useMemo(() => {
        for(let i = 0; i< totalPages; i++){
          pagesArray.push(i+1);
        }
        
    }, [totalPages, page, posts, filter])
    return pagesArray;
}