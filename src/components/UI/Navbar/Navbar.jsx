import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    

    const logOut = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    console.log(isAuth)
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
                {isAuth && <span style={{marginLeft:'15px'}}><MyButton onClick={logOut}>Выйти</MyButton></span>}  
            </div>
      </div>
    )
}

export default Navbar;