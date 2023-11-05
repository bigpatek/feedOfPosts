import React from "react";

const Pagination = ({pagesArray, changePage, page}) => {
    return <div className="page__wrapper">
        {pagesArray.map((p, index) => (
            <span 
            className={page === p ? 'page page__current' : 'page'} 
            key={index}
            onClick={() => changePage(p)}
            >{p}</span>
        ))}
      </div>
}

export default Pagination;