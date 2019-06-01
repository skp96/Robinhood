import React from 'react';
import {Link} from 'react-router-dom';
import NavBarNoUser from '../nav/nav_bar_no_user';

const HomeNoUser = () => {
        return (
            <div className="home-nouser">
                <div className="nav-bar">
                    <NavBarNoUser />
                </div>

                <div className="home-signup">
                    <div className="left">
                        <h1>Invest <br />Commission-Free</h1>
                        <div className="text">
                            <p>Invest in stocks, ETFs, options, and <br/>
                            cryptocurrencies, all commission-free, <br/>
                            right from your phone or desktop.</p>
                        </div>
                        <div className="home-signup-button">
                            <button>
                                <Link className="link" to="/signup">Sign Up</Link>
                            </button>
                        </div>
                    </div>
                    <div className="iphone-image">
                        <img src={window.iphone} />
                    </div>
                </div>
            </div>
            )
    
            
    }
    
export default HomeNoUser;