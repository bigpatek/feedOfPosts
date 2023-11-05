import React from "react";
import style from "./MySelect.module.css"


const MySelect = ({defaulValue, option, value, onChange}) => {
    return (
        <select className={style.mySelect} value={value} onChange = {(event => onChange(event.target.value))}>
            <option value={""}>{defaulValue}</option>
            {option.map(option => (
                <option value={option.value} key={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default MySelect;