import Backbone from 'backbone'


export const LifeGoalModel = Backbone.Model.extend({
	defaults: {
		complete: false
	}
})



export const LifeGoalCollection = Backbone.Collection.extend({
	model: LifeGoalModel
})

export const MilestonelModel = Backbone.Model.extend({
	defaults: {
		complete: false
	}
})



export const MilestoneCollection = Backbone.Collection.extend({
	model: MilestoneModel
})