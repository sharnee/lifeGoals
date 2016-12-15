import React from 'react' 
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LifeGoalView from '../views/lifeGoalView'
import MilestoneView from '../views/milestoneView'
import GoalView from '../views/lifeGoalView'
import Header from '../views/header'
import LogInView from '../views/logInView'
import User from './models/userModel'


const app = function() {
 

  var Controller = Backbone.Router.extend({
  	routes: {
  		'logIn': 'handleLogIn', 
  		'lifeGoals': 'handleLifeGoals', 
      'mileStones/:gid': 'handleMilestones', 
  		'goalView': 'handleGoalViews', 
  		'*default': 'handleDefault'
  	}, 
  	handleLogIn: function (){
  		ReactDOM.render(<LogInView/>, document.querySelector('.bodyContainer'))
  	}, 
  	handleLifeGoals: function(){
  		ReactDOM.render(<LifeGoalView/>, document.querySelector('.bodyContainer'))
  	}, 
  	handleMilestones: function(gid){
  		ReactDOM.render(<MilestoneView gid= {gid}/>, document.querySelector('.bodyContainer'))
  	}, 
  	handleGoalViews: function(){
  		ReactDOM.render(<GoalView/>, document.querySelector('.bodyContainer'))
  	}, 
  	handleDefault: function(){
  		location.hash='logIn'
  	}, 
  	initialize: function() {
      var checkForUser = function(){
          if(!User.getCurrentUser()){
            location.hash = 'logIn' 
          } 
        }
      checkForUser()
      Backbone.history.start()
      Backbone.history.on('route', checkForUser)
	 }  	
  })
  var controller = new Controller
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..