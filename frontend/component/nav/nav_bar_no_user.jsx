import React from 'react';
import { Link } from 'react-router-dom';

const NavBarNoUser = () => {
    return (
        <nav className="login-signup">
            <div className="profile">
                <Link className="nav-home" to="/">
                    <i class="fas fa-feather-alt">littlehood</i>
                </Link>
                <a href="https://github.com/skp96" className="github">Github</a>
                <a href="https://www.linkedin.com/in/sunny-patel-b0729858/" className="linkedin">LinkedIn</a>
            </div>

            <div className="nav-links">
                <Link to="/login" className="nav-login">Log In</Link>
                <button><Link to="/signup" className="nav-signup">Signup</Link></button>
            </div>
        </nav>
    )


}

export default NavBarNoUser;