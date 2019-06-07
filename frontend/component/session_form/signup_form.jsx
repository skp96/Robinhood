import React from 'react';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            fnameError: "",
            lname: "",
            lnameError: "",
            username: "",
            userNameError: "",
            email: "",
            emailErro: "",
            password: "",
            passwordError: "",
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
                    let newError;
                    if (error.includes('Fname')) {
                        newError = error.replace(error, "First name can't be blank")
                        return <div key={i}><i className="fas fa-exclamation-circle"></i>{newError}</div>
                    } else if (error.includes('Lname')) {
                        newError = error.replace(error, "Last name can't be blank")
                        return <div key={i}><i className="fas fa-exclamation-circle"></i>{newError}</div>
                    } else {
                        return <div key={i}><i className="fas fa-exclamation-circle"></i>{error}</div>
                    }
                    
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
                        <input className="signup" type="email" onChange={this.update('email')} value={this.state.email} placeholder="Email address"/>
                        <br/>
                        <input className="signup" type="text" onChange={this.update('username')} value={this.state.username} placeholder="Username"/>
                        <br/>
                        <input className="signup" type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password (min. 7 characters)" />
                        <div className="errors">{this.renderErrors()}</div>

                        <button className="signup-button" type="submit" value={this.props.formType}>Sign Up</button>
                        
                        <div className="existing-member">
                            <Link className="signin-link" to="/login">Already a member, sign in here!</Link>
                        </div>
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