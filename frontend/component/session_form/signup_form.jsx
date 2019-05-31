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
                    <form onSubmit={this.handleSubmit} className="signup-form-box">
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
                            <input className="signup" type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password (min. 10 characters)" />

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