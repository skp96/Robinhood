import React from 'react';
import NavBarUser from '../nav/nav_bar_user'

const HomeUser = (props) => {
    debugger
    return (
        <div className="main-user">
            <div className="nav-bar">
                <NavBarUser logout={props.logout}/>
            </div>
            <p>Under contruction</p>
        </div>
    )
}

export default HomeUser;