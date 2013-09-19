var RewardCategoryPresenter = Backbone.View.extend({
	el: '#rewardCategory',
	
	events: {
		'click .category': 'selectCategory'
	},
	
	initialize: function() {	// Expect a Collector model
		this.categories = new RewardCategoryModel();
	
		this.template = _.template($('#rewardCategoryTemplate').html());
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.categories, 'change', this.render);
		this.listenTo(this.categories, 'reset', this.render);
		
		this.updateCategories();
		this.render();
	},
	
	updateCategories: function() {
		this.categories.fetch({reset: true});
	},
	
	render: function() {
		// TODO scroll reward collection
		this.$el.html(this.template({ rewards: this.collection.slice(0, 10), categories: this.categories }));
		
		return this;
	},
	
	selectCategory: function(event) {
		event.preventDefault();
		var categoryTag = $(event.target);
		var categoryId = categoryTag.attr('categoryId');
		var categoryName = categoryTag.html();

		if (app.presenters.rewardList) {
			app.presenters.rewardCategory.unbind();	// Detach old presenter
		}
		app.presenters.rewardList = new RewardListPresenter({categoryId: categoryId, categoryName: categoryName });
		app.changeView('rewardList');
	}

});