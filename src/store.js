import Backbone from 'backbone'
import _ from 'underscore'
import {LifeGoalCollection, MilestoneCollection} from './scripts/models/dataModels'

var STORE = _.extend(Backbone.Events, {

	data: {
		lifeGoalCollection: new LifeGoalCollection,
		milestoneCollection: new MilestoneCollection,
		goalFormVisible: false
	}, 
	_emitChange: function(){
		this.trigger('storeChanged')
	}, 
	_get: function(key){
		return this.data[key]
	}, 
	_getData: function(key) {
		return this.data
	}, 
	_initialize: function() {
	this._get('lifeGoalCollection').on('update',()=>{
		this._emitChange()
		})
	},
	_set: function(newData){
		this.data= _.extend(this.data, newData)
		this._emitChange()
	}
})

export default STORE