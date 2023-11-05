import React from "react";
import Post from "./Post";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, deletePost}) => {

    if(!posts.length){
        return <h1 style={{textAlign: "center", marginTop: "100px"}}> Постов пока что нет :( </h1>
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                    {posts.map((post, index) => (
                        <CSSTransition
                        key={post.id}
                        classNames = 'post'
                        timeout={500}
                    >
                        <Post number={index + 1} post={post}  delPost = {deletePost}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </div>
    )
}

export default PostList;