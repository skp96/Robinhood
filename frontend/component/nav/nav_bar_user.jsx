import React from 'react';
import { Link } from 'react-router-dom';

const NavBarUser = (props) => {
    return (
        <nav className="login-signup">
            <Link className="nav-home" to="/dashboard">
                <img src={window.logo} />
                <p>littlehood</p>
            </Link>
            <div className="nav-links">
                <button onClick={() => props.logout()}>Logout</button>
            </div>
        </nav>
    )


}

export default NavBarUser;