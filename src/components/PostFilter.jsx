import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
  
    return(
        <div>
        <MyInput type={"text"} placeholder={"поиск по названию поста"} value={filter.query} 
        onChange={(e)=> setFilter({...filter, query: e.target.value}) }/>
        <MySelect value={filter.sort} onChange={selectedSort => setFilter({...filter, sort: selectedSort})} defaultValue={"Сортировать"} 
        options={[{value:"title", name:"По названию"}, {value:"body", name:"По описанию"}]}/>
      </div>
    )
}

export default PostFilter;