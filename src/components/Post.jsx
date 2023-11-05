import React from "react";
import "../styles/App.css"
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

const Post = (props) => {

    const router = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                  {props.post.body}
                </div>
            </div>
            <div className="post__btns"> 
                <MyButton onClick={() => props.delPost(props.post)}>Удалить</MyButton>
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
            </div>
        </div>
    );
}

export default Post;