import Backbone from 'backbone'
import _ from 'underscore'

var STORE = _.extend(Backbone.Events, {

	data: {
		lifeGoalCollection: new LifeGoalCollection
		mileStoneCollection: new MileStoneCollecton 
	}, 

	_emitChange: function(){
		this.trigger('storeChanged')
	}, 
	_get: function(){
		return this.data
	}, 

	_getData: function(key) {
		return this.data[key]
	}, 
	_set: function(newData){
		this.data= _.extend(this.data, newData)
		this._emitChange()
	}
})

export default STORE