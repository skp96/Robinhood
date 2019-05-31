import React from 'react';
import {Link} from 'react-router-dom';

const Splash = () => {
        return (
            <nav className="login-signup">
                <Link to="/login">Login</Link>
                <Link to="signup">Signup</Link>
            </nav>
        )

        
}

export default Splash;