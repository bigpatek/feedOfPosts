import React, {useEffect, useMemo, useState } from "react";
import "../styles/App.css"
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { useSortedAndSearchedPosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from "../utils/pages";
import { usePagesArray } from "../hooks/usePagination";
import Pagination from "../components/UI/pagination/Pagination";


const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () =>{
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })

  const pagesArray = usePagesArray(totalPages, page, posts, filter);

console.log(pagesArray)

  useEffect(() => {
    fetchPosts()  
  }, [page]);

  const sortedAndSearchedPosts = useSortedAndSearchedPosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const deletePost = (currentPost) => {
    setPosts(posts.filter(p => p.id !== currentPost.id));
  }

  const changePage = (p) => {
    setPage(p);
  }
  return (
    <div className="App">
      <MyButton style={{marginTop:"30px", width: "100%", height:"100px"}} onClick={() => setModal(true)}> Создать пост </MyButton>
      <MyModal visible={modal} setVisible={setModal} >
        <PostForm create = {createPost}/>
      </MyModal>
      <hr style={{marginTop:"50px", marginBottom:"50px"}}/>
      <PostFilter filter = {filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {
        isPostLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /> </div>
        : <PostList posts = {sortedAndSearchedPosts} title = "Список 1" number={0} deletePost={deletePost}/>
      }
      <Pagination pagesArray={pagesArray} changePage={changePage} page={page}/>
    </div>
  );
}

export default Posts;
