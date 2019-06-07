import React from 'react';
import HomeUser from './home_user'
import HomeNoUser from './home_no_user'

class HomeIndex extends React.Component {
    render () {
        const currentUser = this.props.currentUser

        if(currentUser) {
            return (
                <HomeUser logout={this.props.logout}/>
            )
        } else {
            return (
                <HomeNoUser login={this.props.login}/>
            )
        }
    }
}

export default HomeIndex;