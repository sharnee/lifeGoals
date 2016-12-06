import React from 'react'
import Header from './header'
import STORE from '../store'
import ACTIONS from '../actions'


var LifeGoalView = React.createClass({
	componentWillMount: function(){
 		console.log('mounting')
 		STORE.on('storeChanged',()=>{
 			this.setState(STORE._getData())
 		})
 	}, 
 	componentWillUnmount: function(){
 		STORE.off('storeChanged')
 	},
	getInitialState: function(){
		console.log('getting inital state')
		return STORE._getData()
	},
	_addGoal: function() {
		STORE._set({
			goalFormVisible: true
		})
	},
	_handleLogOut: function(eventObj){
		location.hash = "logIn"
	}, 
	render: function(){
		return(
			<div className = 'lifeGoalView'>
				<Header/>
				<button onClick={this._handleLogOut} className= 'logOut btn'> Log Out! </button>
				<button onClick={this._addGoal} className="add-goal btn">+</button>
				{/*<GoalList />*/}
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
		ACTIONS.saveGoal()
		var formEl = e.target
		console.log(formEl.value, 'this is the target')
		console.log('handeling the formClass')
		ACTIONS.handleSubmit(formEl.goalInputBar.value, formEl.goalNotes.value, User.getCurrentUser()._id)
		formEl.reset()
	},
	render: function() {
		var formClass = this.props.formVisible ? 'goalForm z-depth-5' : 'hide goalForm'
		return <div className='formContainer'>
					<form onSubmit={this._handleSubmit} className={formClass}>
						<h3>My Life Goal Is To... </h3>
						<input ref='goalInputBar' type ='text' name='goalInputBar' placeholder='Add Life Goal Here'></input>
						<h4> Notes </h4>
						<input ref='goalNotes' type= 'text' name='goalNotes' placeholder= 'Put Notes'></input>
						<button className = "goalSubmit btn" type = "submit">submit</button>
					</form>
				</div>
	}
})
// var GoalCard = React.createClass({
// 		_handleGoalInputBar: function(eventObj){
// 			console.log('do this thing')
// 		}, 
		
// 		_insertLifeGoal: function(eventObj){
// 			eventObj.preventDefault()
// 			/*var value = eventObj.target.value
// 			console.log(eventObj.target.value, 'life goal card goes here')*/
// 			//generate a form
// 			console.log('entering goal')
// 			console.log(this.state.goalInput, 'this is the goal input')
// 			if(this.state.goalInput === 'hidden'){
// 				this.setState({
// 					goalInput: 'visible'
// 				})
// 			}
// 		}, 

// 		render: function(){
// 			return(
// 				<section className={this.state.goalInput + 'goalContainer'} >
// 					<form  onSubmit = {this._insertLifeGoal}>
// 						<button className='addGoal btn' type='submit'> Add Goal </button>
// 						<input onKeyDown={this._handleGoalInputBar} type= 'text' name='goalInputBar' placeholder= 'Add Life Goal Here'></input>
// 					</form>
// 				</section>
// 			)
// 	}
// })
export default LifeGoalView

