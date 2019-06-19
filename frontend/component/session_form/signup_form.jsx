import React from 'react';
import { Link } from 'react-router-dom'

let emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        if (val.length > 0) {
            valid = false
        }
    });
    Object.values(rest).forEach(val => {
        if (val.length === 0) {
            valid = false
        }
    })
    return valid
}
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "",
            email: "",
            password: "",
            formErrors: {
                fname: "",
                lname: "",
                username: "",
                email: "",
                password: "",
            },
            errorclass: ""

        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.checkforErrors = this.checkforErrors.bind(this)
    }

    update(field) {
        return (e) => this.setState({ [field]: e.target.value })
    }

    checkforErrors() {
        let formErrors = this.state.formErrors;
        let state = this.state

        const labels = Object.keys(formErrors)

        labels.forEach((label) => {
            if (label === "fname" && state[label].length < 3) {
                formErrors[label] = "First name must be atleast 3 characters"
            } else if (label === 'lname' && state[label].length < 5) {
                formErrors[label] = "Last name must have atleast 5 characters"
            } else if (label === 'username' && state[label].length < 5) {
                formErrors[label] = "Username must have atleast 5 characters"
            } else if (label === 'email' && !emailRegex.test(state.label)) {
                formErrors[label] = "Please enter a valid email address"
            } else if (label === 'password' && state[label].length < 7) {
                formErrors[label] = "Your password must be atleast 7 characters"
            }
        })
        this.setState({ formErrors })
    }

    handleErrors() {
        this.setState({ errorclass: "show" })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.checkforErrors()

        if (formValid(this.state)) {
            let user = Object.assign({}, this.state)
            this.props.signup(user)

        } else {
            this.handleErrors()
        }
    };


    componentDidMount() {
        document.addEventListener('click', function (e) {
            this.setState({
                formErrors: {
                    fname: "",
                    lname: "",
                    username: "",
                    email: "",
                    password: "",
                }, })
        }.bind(this))
    }


    render() {
        let formErrors = this.state.formErrors;
        return (
            <div className="signup-container">
                <form onSubmit={this.handleSubmit} className="signup-form-box" noValidate>
                    <div className="signup-logo">
                        <Link to="/"><img src={window.logo} /></Link>
                    </div>
                    <div className="signup-header">
                        <h1 className="signup-head">Make Your Money Move</h1>
                        <h2 className="signup-subhead">Robinhood lets your invest in companies you love, commission <br /> -free.</h2>
                    </div>
                    <div className="input-fields">
                        <div className="signup-name">
                            <input type="text" id={formErrors.fname.length > 0 ? "error" : null} onChange={this.update('fname')} value={this.state.fname} name="fname" placeholder="First name" />
                            <div className="errorhandler">
                                {formErrors.fname.length > 0 && (
                                    <span className={`errorhandlertext ${this.state.errorclass}`} id="errorMessage">{formErrors.fname}</span>
                                )}
                            </div>
                            <input type="text" id={formErrors.lname.length > 0 ? "error" : null} onChange={this.update('lname')} value={this.state.lname} name="lname" placeholder="Last name" />
                            <div className="errorhandler">
                                {formErrors.lname.length > 0 && (
                                    <span className={`errorhandlertext ${this.state.errorclass}`} id="errorMessage">{formErrors.lname}</span>
                                )}
                            </div>
                        </div>
                        <br />
                        <input className="signup" id={formErrors.email.length > 0 ? "error" : null} type="email" onChange={this.update('email')} value={this.state.email} name="email" placeholder="Email address" />
                        <div className="errorhandler">
                            {formErrors.email.length > 0 && (
                                <span className={`errorhandlertext ${this.state.errorclass}`}>{formErrors.email}</span>
                            )}
                        </div>
                        <br />
                        <input className="signup" id={formErrors.username.length > 0 ? "error" : null} type="text" onChange={this.update('username')} value={this.state.username} name="username" placeholder="Username" />
                        <div className="errorhandler">
                            {formErrors.username.length > 0 && (
                                <span className={`errorhandlertext ${this.state.errorclass}`} id="errorMessage">{formErrors.username}</span>
                            )}
                        </div>
                        <br />
                        <input className="signup" id={formErrors.password.length > 0 ? "error" : null} type="password" onChange={this.update('password')} value={this.state.password} name="password" placeholder="Password (min. 7 characters)" />
                        <div className="errorhandler">
                            {formErrors.password.length > 0 && (
                                <span className={`errorhandlertext ${this.state.errorclass}`} id="errorMessage">{formErrors.password}</span>
                            )}
                        </div>

                        <button className="signup-button" type="submit" value={this.props.formType}>Sign Up</button>

                        <div className="existing-member">
                            <Link className="signin-link" to="/login">Already a member, sign in here!</Link>
                        </div>
                    </div>
                </form>
                <div className="signup_gif">
                    <img src={window.signup_image} />
                </div>
            </div>
        )
    }
}

export default SignupForm;