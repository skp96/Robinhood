import React from 'react';
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return (e) => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault()
        let user = Object.assign({}, this.state)
        this.props.login(user)
    };

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => {
                    return <div key={i}><i className="fas fa-exclamation-circle"></i>{error}</div>
                })}
            </ul>
        );
    }

    componentDidMount() {
        this.props.clearErrors
    }

    render() {
        return (
            <div className="login-container">
                <div className="login_image_container">
                    <img src={window.login_image}  className="login_image"/>
                </div>
                <div className="login-box-form">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="intro">Welcome to Littlehood</h1>

                        <div className="form-row-user">
                            <div className="username">Username</div>
                            <input type="text" onChange={this.update("username")} value={this.state.username} size="60"/>
                        </div>

                        <div className="form-row-password">
                            <div className="password">Password</div>
                            <input type="password" onChange={this.update("password")} value={this.state.password} size="60"/>
                        </div>

                        <div className="signup-link-container">
                            <Link to="/signup" className="signup-link">Don't have an account yet? Signup here!</Link>
                        </div>    

                        <div className="errors">{this.renderErrors()}</div>

                        
                        <button className="login-button" type="submit" value={this.props.formType}>Sign In</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm