import React from "react";
import style from "./MyModal.module.css"

const MyModal = ({children, visible, setVisible}) => {
    
    const rootStyle = [style.myModal];
    if(visible){
        rootStyle.push(style.active)
    }

    return (
        <div className={rootStyle.join(" ")} onClick={() => setVisible(false)}>
            <div className={style.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;