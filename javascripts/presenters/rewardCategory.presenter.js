var RewardCategoryPresenter = Backbone.View.extend({
	el: '#rewardCategory',
	
	events: {
		'click a.reward': 'selectReward'
	},
	
	initialize: function() {	// Expect a Collector model
		this.featuredRewards = new RewardCollection(null, 'cat300001');
		this.categories = new RewardCategoryModel();
	
		this.template = _.template($('#rewardCategoryTemplate').html());
		this.listenTo(this.featuredRewards, 'change', this.render);
		this.listenTo(this.featuredRewards, 'reset', this.render);
		this.listenTo(this.categories, 'change', this.render);
		this.listenTo(this.categories, 'reset', this.render);
		
		this.updateRewards();
		this.updateCategories();
		
		this.render();
	},
	
	updateRewards: function() {
		this.featuredRewards.fetch({
			reset: true,
			success: function() {
				console.log('reward success', arguments);
			},
			error: function() {
				console.log('reward error', arguments);
			}
		});
	},
	
	updateCategories: function() {
		this.categories.fetch({
			reset: true,
			success: function() {
				console.log('category success', arguments);
			},
			error: function() {
				console.log('category error', arguments);
			}
		});
	},
	
	render: function() {
		var self = this;
		
		if (this.categoryList) {
			this.categoryList.remove();
		}
		
		this.categoryList = new RewardCategoryItemPresenter({model: this.categories});
		
		// TODO scroll reward collection
		this.$el.html(this.template({ rewards: this.featuredRewards.slice(0, 10), categories: this.categories }));

		self.$('.categoryList:not([categoryId])').append(this.categoryList.el);
		
		return this;
	},
	
	selectReward: function(event) {
		event.preventDefault();
		var rewardTag = $(event.target);
		var rewardId = rewardTag.attr('rewardId');
		
		if (app.presenters.reward) {
			app.presenters.reward.unbind();	// Detach old presenter
		}
		app.presenters.reward = new RewardPresenter({rewardId: rewardId});
		app.changeView('reward');
	}

});