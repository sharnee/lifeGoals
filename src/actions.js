import User from './scripts/models/userModel'


var ACTIONS = {
	_register:  function(userData){
		User.register(userData)
		.then(
			function(resp){
				alert('Let\'s get goal setting!!!' )
				console.log(resp)
			},
			function(err){
				alert('There seems to be a problem with the information you submitted please try again')
				console.log(err)
			}
		)
	}, 
	_signInUser: function(email, password){
		User.login(email, password)
		.then(
			function(resp){
				alert('you are now signed in')
			}, 
			function(err){
				alert('please check that your user name and password are correct')
			}
		)
	}
}


export default ACTIONS