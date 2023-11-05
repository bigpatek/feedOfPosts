import { useMemo } from "react";

export const useSortedPost = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        console.log("отработал")
        if(sort){
        return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]));
        }
        return posts;}, [sort, posts]);
    return sortedPosts;
}

export const useSortedAndSearchedPosts = (posts, sort, query) =>{
    const sortedPosts = useSortedPost(posts, sort)
    const sortedAndSearchedPosts = useMemo ( () => {
        if(query) return sortedPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
        else return sortedPosts;
        
      }, [query, sortedPosts]);
      return sortedAndSearchedPosts;
}

