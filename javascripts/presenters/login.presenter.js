var LoginPresenter = Backbone.View.extend({
	el: '#login',
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#loginTemplate').html());
		this.listenTo(this.model, 'change', this.render);
		
		//this.model.fetch();
		
		this.render();		
	},
	
	render: function() {
		console.log(this.template({collector: this.model}));
		this.$el.html('bjadljbald');
		this.$el.html(this.template({collector: this.model}));
		return this;
	}

});