import React from 'react';

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
                    return (<li key={`error-${i}`}>{error}</li>)
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
                <div className="theme"></div>
                <form onSubmit={this.handleSubmit} className="signup-form-box">
                    <div className="signup-header">
                        <h1 className="signup-header">Make Your Money Move</h1>
                        <h2 className="signup-subheader">Robinhood lets your invest in companies you love, commission-free.</h2>
                    </div>
                    <div className="input fields">
                        <label className="first_name">
                            First name
                            <input type="text" onChange={this.update('fname')} value={this.state.fname}/>
                        </label>
                        
                        <label className="last_name">
                            Last Name
                            <input type="text" onChange={this.update('lname')} value={this.state.lname} />
                        </label>

                        <label className="email">
                            Email <address></address>
                            <input type="text" onChange={this.update('email')} value={this.state.email} />
                        </label>

                        <label className="username">
                            Username
                            <input type="text" onChange={this.update('username')} value={this.state.username} />
                        </label>

                        <label className="password">
                            Password (min. 10 characters)
                            <input type="password" onChange={this.update('password')} value={this.state.password} />
                        </label>

                        <div className="errors">{this.renderErrors()}</div>

                        <button className="signup-button" type="submit" value={this.props.formType}>Continue</button>
                    </div>
                    <div className="existing member">
                        {/* add 'already started?' link - 'log in to complete your application -- p tag and within Link tag*/}
                    </div>
                </form>
            </div>
        )
    }
}

export default SignupForm;