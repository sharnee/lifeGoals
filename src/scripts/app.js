import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LifeGoalView from '../views/lifeGoalView'
import MilestoneView from '../views/milestoneView'
import GoalView from '../views/goalView'

const app = function() {
  
  var Controller = Backbone.Router.extend({
  	routes: {
  		'logIn': 'handleLogIn', 
  		'lifeGoals': 'handleLifeGoals', 
  		'mileStones': 'handleMilestones', 
  		'goalView': 'handleGoalViews', 
  		'*default': 'handleDefault'
  	}, 
  	handleLogIn: function (){
  		console.log('you should log in here')
  	}, 
  	handleLifeGoals: function(){
  		ReactDOM.render(<LifeGoalView/>, document.querySelector('.container'))
  	}, 
  	handleMilestones: function(){
  		ReactDOM.render(<MilestoneView/>, document.querySelector('.container'))
  	}, 
  	handleGoalViews: function(){
  		ReactDOM.render(<GoalView/>, document.querySelector('.container'))
  	}, 
  	handleDefault: function(){
  		location.hash='lifeGoals'
  	}, 
  	initialize: function(){
		Backbone.history.start()
	}	
  })
  var controller = new Controller
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..