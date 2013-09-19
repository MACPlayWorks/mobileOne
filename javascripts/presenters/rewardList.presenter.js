var RewardListPresenter = Backbone.View.extend({
	el: '#rewardList',
	
	initialize: function(attr) {	// Expect a Collector model
		attr = attr || {};
		this.categoryName = attr.categoryName || 'Featured Dream Rewards';
		this.categoryId = attr.categoryId || 'cat300001';
		this.rewards = new RewardCollection(null, this.categoryId);
		
		this.template = _.template($('#rewardListTemplate').html());
		this.listenTo(this.rewards, 'change', this.render);
		this.listenTo(this.rewards, 'reset', this.render);
		
		this.rewards.fetch({
			reset: true,
			success: function() {
				console.log('rewards', arguments)
			}
		});
		
		this.render();
	},
	
	render: function() {
		// TODO infinite scroll
		console.log('render', this.rewards.slice(0, 10));
		this.$el.html(this.template({ categoryName: this.categoryName, rewards: this.rewards.slice(0, 10) }));
		
		return this;
	}

});