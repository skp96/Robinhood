import React from 'react';
import { Link } from 'react-router-dom';

const NavBarNoUser = () => {
    return (
        <nav className="login-signup">
            <Link className="nav-home" to="/">
                <img src={window.logo}/>
                <p>littlehood</p>
            </Link>
            <div className="nav-links">
                <Link className="nav-login" to="/login">Log In</Link>
                <button><Link className="nav-signup" to="/signup">Signup</Link></button>
            </div>
        </nav>
    )


}

export default NavBarNoUser;