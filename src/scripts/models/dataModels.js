import Backbone from 'backbone'

export const LifeGoalModel = Backbone.Model.extend({
	urlRoot: '/api/goal',
	idAttribute: '_id',
	defaults: {
	complete: false
	}
})
export const LifeGoalCollection = Backbone.Collection.extend({
	url: '/api/goal',
	model: LifeGoalModel
})
export const MilestonelModel = Backbone.Model.extend({
	defaults: {
		complete: false
	}
})
export const MilestoneCollection = Backbone.Collection.extend({
	url: '/api/milestones',
	model: MilestonelModel
})