import React, {useEffect, useMemo, useRef, useState } from "react";
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
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async () =>{
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data ]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })

  const pagesArray = usePagesArray(totalPages, page, posts, filter);

  useObserver(lastElement, page < totalPages, isPostLoading, () => setPage(page + 1))

useEffect(() => {
  fetchPosts()  
}, [page, limit]);

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
    <MySelect value={limit}
    onChange={value => setLimit(value)}  
    defaultValue={'Кол-во элементов на странице'} 
    options={[
      {value: 5, name: '5'},
      {value: 10, name: '10'}, 
      {value: 15, name: '15'}, 
      {value: -1, name: 'получить все'}
      ]} />
    {postError && <h1>Произошла ошибка {postError}</h1>}
    {isPostLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /> </div>}
    <PostList posts = {sortedAndSearchedPosts} title = "Список 1" number={0} deletePost={deletePost}/>
    <div ref={lastElement} style={{height:'20px'}}/>
    {page < pagesArray.length && <Pagination pagesArray={pagesArray} changePage={changePage} page={page}/>}
  </div>
  );
}

export default Posts;
