var LoginPresenter = Backbone.View.extend({
	el: '#login',
	
	events: {
		'click .button': 'buttonClick'
	},
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#loginTemplate').html());
		this.listenTo(this.model, 'change', this.render);
		
		//this.model.fetch();
		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template({collector: this.model}));
		
		return this;
	},
	
	buttonClick: function() {
		this.model.set({
			collectorNumber: this.$('input').val()
		});
	}

});