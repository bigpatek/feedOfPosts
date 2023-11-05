import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";

const PostIdPage = () => {

    const params = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] =  useFetching( async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    });

    const [fetchComments, isComLoading, comError] =  useFetching( async () => {
        const responce = await PostService.getComments(params.id);
        setComments(responce.data);
    });

    useEffect(( ) => {
        fetchPostById();
        fetchComments();
    }, [])

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h1 style={{margin:'20px 0 '}}>Вы попали на страницу поста №{params.id}</h1>
            {isLoading 
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            : <div>{post.id} {post.title}</div>
            }
            <h1 style={{margin:'20px 0 '}}>Комментарии</h1>
            {isComLoading
            ?   <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            :   <div>
                    {comments.map(comm => (<div style={{width:'800px', marginTop:'15px', border:'1px solid teal', padding:'10px'}}> <div>{comm.email}</div> <div>{comm.body}</div> </div>))}
                </div>
            }
        </div>
    )
}

export default PostIdPage;