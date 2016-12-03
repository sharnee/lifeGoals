import React from 'react'
import Header from './header'
import Footer from './footer'
import GoalCard from './goalCard'

var LifeGoalView = React.createClass({
	componentWillMount: function(){
		console.log('mounting')
	}, 
	componentWillUnmount: function(){
		console.log('unmounting')
	}, 
	getInitialstate: function(){
		console.log('getting inital state')
	}, 
	render: function(){
		return(
			<div className = 'lifeGoalView'>
				<Header/>
				<GoalCard/>
				<Footer/>
			</div>
		)
	}
})
export default LifeGoalView

