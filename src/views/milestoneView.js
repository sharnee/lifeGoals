import React from 'react'
import Header from './header'
import STORE from '../store'
import ACTIONS from '../actions'

var MilestoneView = React.createClass({
	componentWillMount: function(){
		// console.log(this.props.gid)
		STORE.on('storeChanged',()=>{
 			this.setState(STORE._getData())
 		})
 		ACTIONS._fetchMileStones()
 		ACTIONS._fetchOneGoal(this.props.gid)


 		// console.log(individualGoalId, 'this is my individual goal id')
 		// console.log(STORE.data)
 		// console.log(individualGoalId, 'this is the goal id')

 		// FETCHING MILESTONES 
 		// given a goalId
 		// *** invoke an action that will fetch all milestones whose goalId matches the given goalId
 		// set those new milestones on the store, causing a re-render of the view, with those new milestones on state
 		// in the view, map that collection of milestones into a set of <Milestone /> components 

 		// COMPOSE A MILESTONE
 		// in this same view, there should be a form that will allow the user to enter information pertaining to a particular milestone
 		// that form data should be used to build an object. automatically, you should add to that object the relevant lifegoal ID, as well as the current user's ID
 		// invoke an action that will send a post request to the server with this data. server endpoint i believe is already set up. your trello card 
 		 	// is mostly on point with regard to this feature.
	},
	componentWillUnmount: function(){
 		STORE.off('storeChanged')
 	},
 	getInitialState: function(){
		// console.log('getting inital state')
		return STORE._getData()
	},
	_handleLogOut: function(eventObj){
		location.hash = "logIn"
	},
	_toGoalView: function(eventObj){
		location.hash = "lifeGoals"
	},


	render: function(){
		// console.log(this.state, 'this is state')
		// console.log(this.props.gid, this.state.lifeGoalCollection, 'this is the gid')
		// var individualGoalModel = STORE._getData().lifeGoalCollection.get(this.props.gid)
		// var individualGoalSet = individualGoalModel? individualGoalModel.pick('goal', 'notes') : {};
		// var individualGoalModel2 = STORE._getData().lifeGoalModel.get(this.props.gid)
		// console.log('lifegoalModel',this.state.lifeGoalModel)

		return(
			<div>
				<Header/>
				<button onClick={this._handleLogOut} className= 'logOut btn'> Log Out! </button>
				<button onClick={this._toGoalView} className= 'goalView btn'> Back to Goals! </button>
				<IndividualLifeGoal model={this.state.lifeGoalModel} />
				<MileStone milestone={this.state.milestoneCollection} />
				<Research/>
			</div>
		)
	}
})

var IndividualLifeGoal = React.createClass({

	render: function(){
		var myLifeGoalModel = this.props.model
		var theGoal= myLifeGoalModel.get('goal')
		var theNotes = myLifeGoalModel.get('notes')

		// console.log(this.props.collection, 'this is supposed to be the life goal collection')
		// console.log(myLifeGoalModel, 'this is my model')

		return(
			<div >
				<p>#LifeGoal: {theGoal}</p>
				<p>Note to Self: {theNotes} </p>
			</div>
		)
	}
})

var MileStone = React.createClass({
	_handleMilestoneInput: function(e){
		e.preventDefault()
		var inputEl = e.target
		// console.log(inputEl)
		var value = inputEl.value
		// console.log('this is the value', value)
		ACTIONS._addMilestone(inputEl.milestoneInput.value)
		// console.log('this is my value', value)

	}, 
	render: function(){
		var milestoneCollection = this.props.milestoneCollection
		return(
			<div className='milestoneContainer'>
				<form onSubmit={this._handleMilestoneInput} className= 'milestoneForm'>
					<button className = "goalSubmit btn" type = "submit">Submit</button>
					<input ref='milestoneInput' name='milestoneInput' placeholder='Put Milestone Here' type='text'/>
					<CheckList/>
				</form>
				<TextInput/>
			</div>
		)
	}
})

var TextInput = React.createClass({
	render: function(){
		return(
			<p>hi</p>
		)
	}
})

var CheckList = React.createClass({
	render:function(){
		return(
		
			<ul>
				<li>
					<input ref='checklist' name='checklist'/> <button className = "goalSubmit btn" type = "submit">+</button>
				</li>
			</ul>
	
		)
	}
})

var Research = React.createClass({
	render: function(){
	
		return(
			<div className='researchContainer'>
				<p>hi</p>
			</div>
		)
	}
})

window.MilestoneView = MilestoneView
export default MilestoneView