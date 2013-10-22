var NavigationPresenter = Backbone.View.extend({
	el: '#navigation',
	
	events: {
		'click .home': 'navigateToHome',
		'click .rewards': 'navigateToRewards',
		'click .sponsors': 'navigateToSponsors',
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
	
	navigateToHome: function() {
		if (app.collector) {
			app.collector.fetch();
			app.changeView('home');
		} else {
			app.changeView('login');
		}
	},
	
	navigateToRewards: function() {
		if (!app.presenters.rewardCategory) {
			app.presenters.rewardCategory = new RewardCategoryPresenter();
		} else {
			app.presenters.rewardCategory.updateRewards();
			app.presenters.rewardCategory.updateCategories();
		}
		app.changeView('rewardCategory');
		app.navigation('hide');
	},
	
	navigateToSponsors: function() {
		app.presenters.sponsorAll = new SponsorAllPresenter();
		app.changeView('sponsorAll');
		app.navigation('hide');
	}

});