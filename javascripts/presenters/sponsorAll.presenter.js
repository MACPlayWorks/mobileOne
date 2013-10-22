var SponsorAllPresenter = Backbone.View.extend ({
	el: '#sponsorAll',
	
	events: {
		'click a.sponsor': 'selectSponsor',
		'click a.sponsorToAll': 'changeToSponsorAll',
		'click a.sponsorToCategory': 'changeToSponsorCategory'
	},
	
	initialize: function(attributes){
		var attr = attributes || {};
		
		if (attr.categoryId && attr.categoryName) {
			this.categoryId = attr.categoryId;
			this.categoryName = attr.categoryName;
			
			this.sponsors = new SponsorCollection([], {categoryId: this.categoryId});
			
		} else {
			this.sponsors = new SponsorCollection();
		
		};
		
		this.template = _.template($('#sponsorAllTemplate').html());
		
		this.listenTo(this.sponsors, 'change', this.render);
		this.listenTo(this.sponsors, 'reset', this.render);


		
		this.updateSponsors();
		
		this.render();
	},
	
	
	updateSponsors: function() {
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

		this.$el.html(this.template({ categoryName: this.categoryName, sponsors: this.sponsors }));
		
		return this;
	},
	
	
	selectSponsor: function(event) {
		event.preventDefault();
		
		var sponsorElement = $(event.target);
		var sponsorId = sponsorElement.attr('sponsorId');
		
		if (app.presenters.sponsor) {
			app.presenters.sponsor.unbind();
		}
		app.presenters.sponsor = new SponsorPresenter({id: sponsorId});
		app.changeView('sponsor');
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
