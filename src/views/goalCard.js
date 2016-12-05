import React from 'react'

var GoalCard = React.createClass({
		
		_insertLifeGoal: function(input){
			console.log('life goal card goes here')
		}, 

		render: function(){
			return(
				<form onSubmit = {this._insertLifeGoal}>
					<input  type = 'text' name='#LifeGoal'/>
				</form>
			)
	}
})

export default GoalCard