import React from 'react'
import Header from './header'
import STORE from '../store'
import ACTIONS from '../actions'


var LifeGoalView = React.createClass({
	componentWillMount: function(){
 		// console.log('mounting')
 		STORE.on('storeChanged',()=>{
 			this.setState(STORE._getData())
 		})
 		ACTIONS._fetchGoals()

 	}, 
 	componentWillUnmount: function(){
 		STORE.off('storeChanged')
 	},
	getInitialState: function(){
		// console.log('getting inital state')
		return STORE._getData()
	},
	_addGoal: function() {
		STORE._set({
			goalFormVisible: true,
	
			
		})
	},

	_handleLogOut: function(){
		ACTIONS.logout()
	}, 
	render: function(){
		return(
			<div className = 'lifeGoalView'>
				<Header/>
				<button onClick={this._handleLogOut} className= 'logOut btn'> Log Out! </button>
				<button onClick={this._addGoal} className="add-goal btn">+</button>
				<GoalList collection={this.state.lifeGoalCollection} />
				<NewGoalForm formVisible={this.state.goalFormVisible} />
			</div>
		)
	}
})
window.NewGoalForm = NewGoalForm
const NewGoalForm = React.createClass({
	_handleSubmit: function(e) {
		//for now it just hides the popout
		e.preventDefault()
		var formEl = e.target
		ACTIONS.saveGoal(formEl.goalInputBar.value, formEl.goalNotes.value)
		// console.log(formEl.value, 'this is the target')
		// console.log('handeling the formClass')
		formEl.reset()
	},
	render: function() {
		var formClass = this.props.formVisible ? 'goalForm z-depth-5' : 'hide goalForm'
		//on the submit of this form I want it to auto generate a goal card and add the data inputted from the form inot the card
		return <div className='formContainer'>
					<form onSubmit={this._handleSubmit} className={formClass}>
						<h3>My Life Goal Is To... </h3>
						<input ref='goalInputBar' type ='text' name='goalInputBar' placeholder='Add Life Goal Here'></input>
						<h4> Notes to Self </h4>
						<input ref='goalNotes' type= 'text' name='goalNotes' placeholder= 'Put Notes Here'></input>
						<button className = "goalSubmit btn" type = "submit">submit</button>
					</form>
				</div>
	}
})


var GoalList = React.createClass({
	_makeGoalCard: function(goalModel){
		return <Goal model={goalModel} key={goalModel.cid}/>
	},
	render: function(){
		var myCollection = this.props.collection
		// var listVis = myCollection.listVisible ? 'hide goalList' : 'goalList' 
		// console.log(myCollection, 'this is my collection')
		return (
			<div>
				<div >
					{myCollection.map(this._makeGoalCard)}
				</div>
			</div>
		)
	}
})
const Goal = React.createClass({

	_deleteGoal: function() {
		ACTIONS.deleteGoal(this.props.model)
	},

	_goToMilestone: function(eventObj){
	
		ACTIONS.viewMilestone(this.props.model.get('_id'))
	
	},

	render: function() {
		var model = this.props.model
		// console.log(model, 'this is the #lifeGoal model')
		var	myGoal= model.get('_id') 
		return (
		
				<div  className="goalCard  z-depth-5">
					<div onClick={this._goToMilestone} className="goalInfo " role="button" tabIndex="0">
						<p>#LifeGoal: {model.get('goal')} </p>
						<p>Note to Self: {model.get('notes')} </p>
					</div>
					<button className='deleteGoal' onClick={this._deleteGoal}>Delete Goal!</button>
				</div>
		)
	}
})

export default LifeGoalView

