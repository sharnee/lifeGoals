import User from './scripts/models/userModel'
import LogInView from './views/logInView'
import STORE from './store'
import {LifeGoalModel} from './scripts/models/dataModels'

window.User = User
var ACTIONS = {
	
	handleSubmit: function(inputGoal, inputNotes, id) {
		var newGoal = {
			goal: inputGoal, 
			notes: inputNotes,
			userID: User.getCurrentUser()
		}
		var lifeGoalModel = new LifeGoalModel(newGoal)
		var promise = lifeGoalModel.save()
		promise.done(function(response) {console.log(response)})
		promise.fail(function(response) {console.log(response)})
		STORE._get('lifeGoalCollection').add(lifeGoalModel)
	},

	fetchTasks: function() {
		STORE._get('lifeGoalCollection').fetch()
	},
	
	_register:  function(userData){
		User.register(userData)
		.then(
			function(resp){
				alert('Let\'s get goal setting!!!' )
				ACTIONS._signInUser(userData.email, userData.password)
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
				location.hash = "lifeGoals"
			}, 
			function(err){
				alert('please check that your user name and password are correct')
			}
		)
	},

	saveGoal: function() {
		//eventually this function will handle all the logic of making a post request to the server to save a new goal to the db
		STORE._set({
			goalFormVisible: false
		})
	}
}


export default ACTIONS