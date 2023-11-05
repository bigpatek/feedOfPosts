import React from "react";
import {Route, Routes, Navigate} from "react-router-dom"
import Posts from "../../../pages/Posts";
import About from "../../../pages/About";
import PostIdPage from "../../../pages/PostIdPage";

const AppRouter = () => {
    return (
        <Routes>
          <Route path={"/posts"} element={<Posts />}/>
          <Route exact path={"/about"} element={<About />} />
          <Route exact path={"/posts/:id"} element={<PostIdPage/>} />
          <Route path="/*" element={<Navigate to="/posts" replace />} />
      </Routes>
    )
}

export default AppRouter;