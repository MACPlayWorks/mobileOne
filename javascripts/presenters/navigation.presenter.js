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
		});
	},
	
	render: function() {
		this.$el.html(this.template({view: this.model.currentView}));
		
		return this;
	},
	
	navigateToRewards: function() {
		var featuredRewards = new RewardCollection('cat300001');
		featuredRewards.fetch({
			success: function() {
				if (!app.presenters.rewardCategory) {
					app.presenters.rewardCategory = new RewardCategoryPresenter({collection: featuredRewards});
				} else {
					app.presenters.rewardCategory.collection.reset(featuredRewards.models);
				}
				if (!app.presenters.rewardCategory.categories.id) {	// Failed to retrieve categories
					// Retry
					app.presenters.rewardCategory.updateCategories();
				}
				app.changeView('rewardCategory');
				app.navigation('hide');
			}
		});
	}
});