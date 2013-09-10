var HomePresenter = Backbone.View.extend({
	el: '#home',
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#homeTemplate').html());
		this.listenTo(this.model, 'change', this.render);
		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template({user: this.model}));
		
		return this;
	}

});