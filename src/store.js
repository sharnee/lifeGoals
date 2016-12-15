import Backbone from 'backbone'
import _ from 'underscore'
import {LifeGoalCollection, MilestoneCollection, LifeGoalModel, MilestonelModel} from './scripts/models/dataModels'

var STORE = _.extend(Backbone.Events, {

	data: {
		lifeGoalModel: new LifeGoalModel, 
		lifeGoalCollection: new LifeGoalCollection,
		milestoneCollection: new MilestoneCollection,
		milestonelModel: new MilestonelModel,
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
STORE._initialize()
window.STORE = STORE
export default STORE