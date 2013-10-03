var SponsorCategoryListPresenter = Backbone.View.extend ({
	el: '#sponsorCategoryList',
	
	events: {
		'click a.sponsor': 'selectSponsor'
	},
	
	initialize: function(attr){

		this.categoryId = attr.id;
		this.categoryName = attr.name;
		
		this.sponsors = new SponsorCategoryListCollection(this.categoryId, '5', '24');
		
		this.template = _.template($('#sponsorCategoryListTemplate').html());
		this.listenTo(this.sponsors, 'change', this.render);
		this.listenTo(this.sponsors, 'reset', this.render);

		
		this.sponsors.fetch({
			reset: true,
			success: function() {
				console.log('sponsors', arguments)
			}
		});
		
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
				console.log('sponsor error', arguments);
			}
		});
	},
	
	render: function() {
	
		console.log('render', this.sponsors.slice(0,24));
		this.$el.html(this.template({ categoryName: this.categoryName, sponsors: this.sponsors.slice(0, 24) }));
		
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
	}
	
});