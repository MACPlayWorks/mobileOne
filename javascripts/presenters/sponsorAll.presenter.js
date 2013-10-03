var SponsorAllPresenter = Backbone.View.extend ({
	el: '#sponsorAll',
	
	events: {
		'click a.sponsor': 'selectSponsor',
		'click a.sponsorToAll': 'changeToSponsorAll',
		'click a.sponsorToCategory': 'changeToSponsorCate'
	},
	
	initialize: function(){

		this.sponsors = new SponsorCollection('5', '24');
		
		this.template = _.template($('#sponsorAllTemplate').html());
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
		this.$el.html(this.template({ sponsors: this.sponsors.slice(0, 24) }));
		
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
	
	
	changeToSponsorCate: function(event) {
		event.preventDefault();
		
		if (app.presenters.sponsorCategory) {
			app.presenters.sponsorCategory.unbind();
		}
		app.presenters.sponsorCategory = new SponsorCategoryPresenter();
		app.changeView('sponsorCategory');
	}
	
});
