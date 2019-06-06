import React from 'react';
import NavBarUser from '../nav/nav_bar_user'

const HomeUser = (props) => {
    return (
        <div className="main-user">
            <div className="nav-bar">
                <NavBarUser logout={props.logout}/>
            </div>
        </div>
    )
}

export default HomeUser;