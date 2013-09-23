var RewardCategoryItemPresenter = Backbone.View.extend({
	tagName: 'li',
	className: 'category',
	
	events: {
		'click a.category': 'selectCategory',
		'click a.reward': 'selectReward'
	},
	
	initialize: function(attr) {	// Expect a Collector model
		this.template = _.template($('#rewardCategoryItemTemplate').html());
		this.listenTo(this.model, 'change', this.render);
		
		this.render();
	},
	
	render: function() {
		var self = this;
		this.removeChildren();
		this.categoryItems = [];
		
		this.$el.html(this.template({ category: this.model }));
		
		// Construct children
		(this.model.get('childCat') || []).forEach(function(category) {
			var rewardCategoryItem = new RewardCategoryItemPresenter({model: new Backbone.Model(category)});
			self.$('.categoryList[categoryId=' + self.model.id + ']').append(rewardCategoryItem.el);
			self.categoryItems.push(rewardCategoryItem);
		});
		
		return this;
	},
	
	removeChildren: function() {
		if (this.categoryItems) {
			this.categoryItems.forEach(function (categoryItem) {
				categoryItem.remove();
			});
		}
	},
	
	remove: function() {
		this.$el.remove();
		this.stopListening();
		this.removeChildren();

		return this;
	},
	
	selectCategory: function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		var categoryTag = $(event.target);
		var categoryId = categoryTag.attr('categoryId');
		var categoryName = categoryTag.html();
		console.log(categoryTag, categoryId, categoryName);

		if (app.presenters.rewardList) {
			app.presenters.rewardList.unbind();	// Detach old presenter
		}
		app.presenters.rewardList = new RewardListPresenter({categoryId: categoryId, categoryName: categoryName });
		app.changeView('rewardList');
	},

});