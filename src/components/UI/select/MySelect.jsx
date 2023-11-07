import React from "react";
import style from "./MySelect.module.css"


const MySelect = ({defaultValue, options, value, onChange}) => {
    return (
        <select className={style.mySelect} value={value} onChange = {(event => onChange(event.target.value))}>
            <options value={""}>{defaultValue}</options>
            {options.map(options => (
                <option value={options.value} key={options.value}>
                    {options.name}
                </option>
            ))}
        </select>
    )
}

export default MySelect;