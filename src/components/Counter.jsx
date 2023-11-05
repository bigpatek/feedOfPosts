import React, {useState} from "react";

const Counter = (props) => {
    const [likes, setLikes] = useState(0);

    
     let increment = () => {
        setLikes(likes + 1);
    }

    let decrement = () => {
        setLikes(likes - 1);
    }

    return (
        <div className="Counter">
            <div>{likes}</div>
            <button onClick={decrement}>{props.dec}</button>
            <button onClick={increment}>{props.inc}</button>
        </div>
    )
}

export default Counter;