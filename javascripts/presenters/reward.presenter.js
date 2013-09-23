var RewardPresenter = Backbone.View.extend({
	el: '#reward',
	
	initialize: function(attr) {	// Expect a Collector model
		attr = attr || {};
		
		// TODO verify if reward exists
		this.rewardId = attr.rewardId;
		this.reward = new RewardModel({id: this.rewardId});
		
		this.template = _.template($('#rewardTemplate').html());
		this.listenTo(this.reward, 'change', this.render);

		this.reward.fetch();
		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template({reward: this.reward.attributes }));
		
		return this;
	}

});