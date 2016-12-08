import User from './scripts/models/userModel'
import LogInView from './views/logInView'
import STORE from './store'
import {LifeGoalModel, LifeGoalCollection} from './scripts/models/dataModels'

window.User = User
var ACTIONS = {
	deleteGoal: function(model) {
		model.destroy()
			.done(()=>alert(model.get('goal') + ' successfully deleted!'))
			.fail(()=>alert(model.get('goal') + 'failed to delete'))
		STORE._emitChange()
	},


	fetchGoals: function() {
		// create a new instance of a LifeGoals collection
		// fetch that collection. fetch() will return a promise
		// in the .then() method of that promise, queue up a callback that will...
			// set the collection that is now full of data as the 'lifeGoalCollection' property on the store
			// this will trigger an automatic reflow of your flux cycle, i.e. a re-render of the view.
		var newLifeGoalCollection = new LifeGoalCollection()
		// console.log (newLifeGoalCollection, 'this is the life goal collection')

		var promise = newLifeGoalCollection.fetch({
			data: {
				userID: User.getCurrentUser()._id
			}
		})
		promise.then(
			function(){
				STORE._set({
					lifeGoalCollection: newLifeGoalCollection
					
				})
				// console.log('I now have the data')
		})
		
	
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

	saveGoal: function(inputGoal, inputNotes) {
		//eventually this function will handle all the logic of making a post request to the server to save a new goal to the db
		
		var newGoal = {
			goal: inputGoal, 
			notes: inputNotes,
			userID: User.getCurrentUser()._id
		}
		// console.log(newGoal.userID)
		var lifeGoalModel = new LifeGoalModel(newGoal)
		// .save() initates POST request to the url specified on the models constructor
		// the second thing: it puts the content of the model in the body of the request
		var promise = lifeGoalModel.save()
		promise.done(function(response) {
			// console.log(response)
			STORE._set({
				goalFormVisible: false
			})
			STORE._get('lifeGoalCollection').add(lifeGoalModel)
			STORE._emitChange()
		})
		promise.fail(function(response) {console.log(response)})	
	}
}


export default ACTIONS