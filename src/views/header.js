import React from 'react'

var Header = React.createClass({
	render: function(){
		return(
			<header className="header">
			<h1 className="headline">#LifeGoals<small> <br/> by Shar'nee Francis</small></h1>
			<ul className="header-subnav">
				<li><a href="#lifeGoals">#LifeGoals</a></li>
				<li><a target="_blank" href="http://zurb.com/responsive">Note To Self</a></li>
			</ul>
			</header>
		)
	}
})

export default Header