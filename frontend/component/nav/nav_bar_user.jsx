import React from 'react';
import { Link } from 'react-router-dom';


const NavBarUser = (props) => {
    return (
        <nav className="user-nav">
            <Link className="user-nav-home" to="/dashboard">
                <img src={window.logo} />
            </Link>
            <div className="user-nav-links">
                <button onClick={() => props.logout()}>Logout</button>
            </div>
        </nav>
    )


}

export default NavBarUser;