var NavigationPresenter = Backbone.View.extend({
	el: '#navigation',
	
	events: {
		'click .rewards': 'navigateToRewards'
	},
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#navigationTemplate').html());
		this.render();
		
		$('#application > .navigationOverlay').click(function() {
			app.navigation('hide');
		})
	},
	
	render: function() {
		this.$el.html(this.template({view: this.model.currentView}));
		
		return this;
	},
	
	navigateToRewards: function() {
		var featuredRewards = new RewardCollection('cat300001');
		featuredRewards.fetch({
			success: function() {
				if (!app.presenters.rewardList) {
					app.presenters.rewardList = new RewardListPresenter({collection: featuredRewards});
				} else {
					app.presenters.rewardList.collection.reset(featuredRewards.models);
				}
				app.changeView('rewardList');
			}
		});
	}
});