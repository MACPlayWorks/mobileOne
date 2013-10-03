var SponsorPresenter = Backbone.View.extend ({
	el: '#sponsor',
	
	initialize: function(attr) {
		
		this.sponsorId = attr.id;
		this.sponsor = new SponsorModel({id: this.sponsorId});
		
		this.template = _.template($('#sponsorTemplate').html());
		this.listenTo(this.sponsor, 'change', this.render);

		this.sponsor.fetch();
		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template({sponsor: this.sponsor}));
		
		return this;
	}

});