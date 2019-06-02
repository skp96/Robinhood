import React from 'react';
import HomeUser from './home_user'
import HomeNoUser from './home_no_user'

class HomeIndex extends React.Component {
    render () {
        const currentUser = this.props.currentUser

        if(currentUser) {
            debugger
            return (
                <HomeUser logout={this.props.logout}/>
            )
        } else {
            return (
                <HomeNoUser />
            )
        }
    }
}

export default HomeIndex;