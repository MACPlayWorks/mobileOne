var SponsorCategoryPresenter = Backbone.View.extend ({
	el: '#sponsorCategory',
	
	events: {
		'click a.sponsor': 'selectSponsor',
		'click a.sponsorToAll': 'changeToSponsorAll',
		'click a.sponsorToCategory': 'changeToSponsorCategory'
	},
	
	initialize: function(){

		this.sponsors = new SponsorCategoryCollection();
		
		this.template = _.template($('#sponsorCategoryTemplate').html());
		this.listenTo(this.sponsors, 'change', this.render);
		this.listenTo(this.sponsors, 'reset', this.render);

	
		
		this.updateCategories();
		
		this.render();
	},
	
	updateCategories: function() {
		this.sponsors.fetch({
			reset: true,
			success: function() {
				console.log('sponsor success', arguments);
			},
			error: function() {
				console.error('sponsor error', arguments);
			}
		});
	},
	
	render: function() {
	
		console.log('render', this.sponsors);
		this.$el.html(this.template({ sponsors: this.sponsors }));
		
		return this;
	},
	
	
	selectSponsor: function(event) {
		event.preventDefault();
		var sponsorElement = $(event.target);
		var categoryId = sponsorElement.attr('categoryId');
		var categoryName = sponsorElement.attr('categoryName');
		
		if (app.presenters.sponsorAll) {
			app.presenters.sponsorAll.unbind();
		}
		app.presenters.sponsorAll = new SponsorAllPresenter({categoryId: categoryId, categoryName: categoryName});
		app.changeView('sponsorAll');
	},
	
	changeToSponsorAll: function(event) {
		event.preventDefault();
		
		if (app.presenters.sponsorAll) {
			app.presenters.sponsorAll.unbind();
		}
		app.presenters.sponsorAll = new SponsorAllPresenter();
		app.changeView('sponsorAll');
	},	
	
	
	changeToSponsorCategory: function(event) {
		event.preventDefault();
		
		if (app.presenters.sponsorCategory) {
			app.presenters.sponsorCategory.unbind();
		}
		app.presenters.sponsorCategory = new SponsorCategoryPresenter();
		app.changeView('sponsorCategory');
	}
	
});


	