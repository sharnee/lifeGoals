import React from 'react'
import Header from './Header'
import ACTIONS from '../actions'


var inputsToNext = {
	firstName: 'lastName',
	lastName: 'email',
	email: 'address',
	address: 'phone',
	phone: 'password'
};

var inputsToNextSign = {
	email: 'signPassword',
	password: 'signpassword'
};

var LogInView = React.createClass({

	getInitialState: function() {
		return {
			signInClass: 'hidden',
			registerClass: 'visible',
			signInButton: 'visible', 
			registerButton: 'hidden'
		}
	},
	_handleKeydown: function(eventObj){
		// console.log(eventObj, 'this is the event!')
		// console.log(eventObj.keyCode, 'htis is the length!')
		var value = eventObj.target.value
		if (eventObj.keyCode === 13){
			var nextRef = inputsToNext[eventObj.target.name];
			var currentRef = inputsToNext[eventObj.target]
			//throws errors / has bug
			if (eventObj.target.name === 'phone' && value.length !== 10 && type !== 'number'){
				alert('Please Enter 10 digit Phone Number')
				this.refs[currentRef]
			}
			else if (eventObj.target.name === 'email' && eventObj.target.value.indexOf('@' && '.') === -1){
				alert('Please Enter Valid Email Address') 
				this.refs[currentRef]
			}
			else if (eventObj.target.value.length >= 2){
				// var n
				// console.log('this is more than 2')
				console.log(eventObj.target.name, 'the name')
				// console.log(inputsToNext[eventObj.target.name], 'the next')
				window.references = this.refs;
				this.refs[nextRef].focus();
			}
			if (eventObj.target.value.length < 2){
				alert('Please Enter Valid Name')
			}
		}
	}, 

	_handleSignKeydown: function(eventObj){
		// console.log(eventObj, 'this is the event!')
		// console.log(eventObj.keyCode, 'htis is the length!')
		var value = eventObj.target.value
		if (eventObj.keyCode === 13){
			var nextRef = inputsToNextSign[eventObj.target.name];
			console.log(nextRef, 'this is next ref')
			var currentRefs = inputsToNextSign[eventObj.target]
			//throws errors / has bug
			if (eventObj.target.name === 'email' && eventObj.target.value.indexOf('@' && '.') === -1){
				alert('Please Enter Valid Email Address')
			}
			else if (this.refs[nextRef]){
				this.refs[nextRef].focus()
			}
		}
	}, 
	signInUser: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target
		ACTIONS._signInUser(
			 formEl.email.value, 
			formEl.password.value
		)
		formEl.reset()
	},
	_handleRegSubmit: function(eventObj){
		ACTIONS.handleRegSubmit(eventObj)
	}, 
	_handleSignSubmit: function(eventObj){

		console.log('handeling sign submit')
		ACTIONS.handleSignSubmit(eventObj)
	}, 
	_registerUser: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target
		ACTIONS._register({
			email: formEl.email.value, 
			password: formEl.password.value,
			firstName: formEl.firstName.value, 
			lastName: formEl.lastName.value, 
			phone: formEl.phone.value,
			address: formEl.address.value
		})
		formEl.reset()
	},

	_showSignIn: function() {
		console.log(this.state.signInClass, 'signInClass')
		console.log(this.state.registerClass, 'registerClass')
		if(this.state.signInClass === 'hidden'){
			this.setState({
			signInClass: 'visible',
			registerClass: 'hidden', 
			signInButton: 'hidden', 
			registerButton: 'visible'
		})
		}
		if(this.state.signInClass === 'visible'){
			this.setState({
			signInClass: 'hidden',
			registerClass: 'visible', 
			signInButton: 'visible', 
			registerButton: 'hidden'
		})
		}
	},

	render: function(){
		console.log(this.state)
		window.stateForComponent = this.state
		return (
			<div className = 'logInView'>
				<Header/>
				<button onClick ={this._showSignIn} className={this.state.signInButton + ' btn signInButton'} type="submit"> Sign In! </button>
				<button onClick ={this._showSignIn} className={this.state.registerButton + ' btn registerButton'} type="submit"> Register! </button>
				<section className= {this.state.registerClass + ' reg container'}>
					<h1 className = 'registration title'> Let's Register</h1>
					<form onSubmit = {this._registerUser}>
						<h3> First Name </h3> 
						<input ref='firstName' onKeyDown={this._handleKeydown} name = 'firstName' placeholder = 'My first name is...' />
						<h3> Last Name </h3> 
						<input ref='lastName' onKeyDown={this._handleKeydown} name = 'lastName' placeholder = 'My last name is... ' />
						<h3> Email Address </h3> 
						<input ref='email' onKeyDown={this._handleKeydown} name = 'email' placeholder = 'My email address is...'/>
						<h3> Mailing Address </h3> 
						<input ref='address' onKeyDown={this._handleKeydown} name = 'address' placeholder = 'My home address is...'/>
						<h3> Phone Number </h3> 
						<input ref='phone' type='number' min='0' onKeyDown={this._handleKeydown} name = 'phone' placeholder = 'My phone number is...'/>
						<h3> Password </h3> 
						<input ref='password' name = 'password' placeholder = '' /><br/>
						<button className='registerButtons btn' type="submit"> Submit </button>
					</form>
				</section>
				<section className = {this.state.signInClass + ' logIn container'} >
					<h1 className = 'signIn title'> Let's Sign In</h1>
					<form onSubmit = {this.signInUser}>
						<h3> Email Address </h3> 
						<input ref='signemail' onKeyDown={this._handleSignKeydown} name = 'email' placeholder = 'My email address is...'/><h3> Password </h3> 
						<input ref='signPassword' onKeyDown={this._handleSignKeydown} name = 'password' placeholder = '' type = 'My secret password is...'/><br/>
						<button className='submitButton btn' type="submit"> Sign In </button>
					</form>
				</section>
			</div>
		)
	}
})

export default LogInView