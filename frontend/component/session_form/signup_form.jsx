import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
			username: '',
			email: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.update = this.update.bind(this);
	}

	update(field) {
		return (e) => this.setState({ [field]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		let user = Object.assign({}, this.state);
		this.props.signup(user);
	}

	componentDidMount() {
		this.props.clearErrors;
	}

	renderErrors() {
		return (
			<ul>
				{this.props.errors.map((error, i) => {
					if (error.includes('Fname')) {
						let newError = error.replace('Fname', 'First name');
						return (
							<div key={i}>
								<i className='fas fa-exclamation-circle' />
								{newError}
							</div>
						);
					} else if (error.includes('Lname')) {
						let newError = error.replace('Lname', 'Last name');
						return (
							<div key={i}>
								<i className='fas fa-exclamation-circle' />
								{newError}
							</div>
						);
					} else {
						return (
							<div key={i}>
								<i className='fas fa-exclamation-circle' />
								{error}
							</div>
						);
					}
				})}
			</ul>
		);
	}

	render() {
		let formErrors = this.state.formErrors;
		return (
			<div className='signup-container'>
				<form onSubmit={this.handleSubmit} className='signup-form-box' noValidate>
					<div className='signup-logo'>
						<Link to='/'>
							<img src={window.logo} />
						</Link>
					</div>
					<div className='signup-header'>
						<h1 className='signup-head'>Make Your Money Move</h1>
						<h2 className='signup-subhead'>
							Robinhood lets your invest in companies you love, commission <br /> -free.
						</h2>
					</div>
					<div className='input-fields'>
						<div className='signup-name'>
							<input
								type='text'
								onChange={this.update('fname')}
								value={this.state.fname}
								name='fname'
								placeholder='First name'
							/>
							<input
								type='text'
								onChange={this.update('lname')}
								value={this.state.lname}
								name='lname'
								placeholder='Last name'
							/>
						</div>
						<br />
						<input
							className='signup'
							type='email'
							onChange={this.update('email')}
							value={this.state.email}
							name='email'
							placeholder='Email address'
						/>
						<br />
						<input
							className='signup'
							type='text'
							onChange={this.update('username')}
							value={this.state.username}
							name='username'
							placeholder='Username'
						/>
						<br />
						<input
							className='signup'
							type='password'
							onChange={this.update('password')}
							value={this.state.password}
							name='password'
							placeholder='Password (min. 7 characters)'
						/>
						<div className='errors'>{this.renderErrors()}</div>

						<button className='signup-button' type='submit' value={this.props.formType}>
							Sign Up
						</button>

						<div className='existing-member'>
							<p
								className='signin-link'
								onClick={() => this.props.login({ username: 'robinhood', password: 'littlehood' })}
							>
								Don't want to sign up? Try the Demo!
							</p>
						</div>
					</div>
				</form>
				<div className='signup_gif'>
					<img src={window.signup_image} />
				</div>
			</div>
		);
	}
}

export default SignupForm;
