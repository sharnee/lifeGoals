import Backbone from 'backbone'

export const LifeGoalModel = Backbone.Model.extend({
	urlRoot: '/api/goal',
	idAttribute: '_id',
	defaults: {
		complete: false
	},
	parse: function(rawResponse) {
		if (rawResponse.length) { // if it's an array, return the first (and only) element
			return rawResponse[0]
		}
		return rawResponse // if it's a plain old object, don't do anything. return the object
	}
})
export const LifeGoalCollection = Backbone.Collection.extend({
	url: '/api/goal',
	model: LifeGoalModel
})
export const MilestonelModel = Backbone.Model.extend({
	urlRoot: '/api/milestones',
	idAttribute:'_id',
	defaults: {
		complete: false
	}
})
export const MilestoneCollection = Backbone.Collection.extend({
	url: '/api/milestones',
	model: MilestonelModel
})