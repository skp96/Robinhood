import React from 'react';
import { Link } from 'react-router-dom'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            username: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return (e) => this.setState({[field]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        let user = Object.assign({}, this.state)
        this.props.signup(user)
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

    render () {
        return (
            <div className="signup-container">
                <form onSubmit={this.handleSubmit} className="signup-form-box">
                    <div className="signup-logo">
                        <Link to="/"><img src={window.logo} /></Link>
                    </div>
                    <div className="signup-header">
                        <h1 className="signup-head">Make Your Money Move</h1>
                        <h2 className="signup-subhead">Robinhood lets your invest in companies you love, commission <br/> -free.</h2>
                    </div>
                    <div className="input-fields">
                    <div className="signup-name">
                            <input type="text" onChange={this.update('fname')} value={this.state.fname} placeholder="First name"/>
                                <input type="text" onChange={this.update('lname')} value={this.state.lname} placeholder="Last name"/>
                        </div>
                        <br/>
                        <input className="signup" type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email address"/>
                        <br/>
                        <input className="signup" type="text" onChange={this.update('username')} value={this.state.username} placeholder="Username" />
                        <br/>
                        <input className="signup" type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password (min. 7 characters)" />
                        <div className="existing-member">
                            <Link className="signin-link" to="/login">Already a member, sign in here!</Link>
                        </div>
                        <div className="errors">{this.renderErrors()}</div>

                        <button className="signup-button" type="submit" value={this.props.formType}>Sign Up</button>
                    </div>
                </form>
                <div className="signup_gif">
                    <img src={window.signup_image}/>
                </div>
            </div>
        )
    }
}

export default SignupForm;