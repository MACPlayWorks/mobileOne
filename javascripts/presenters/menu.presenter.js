var MenuPresenter = Backbone.View.extend({
	el: '#menu',
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#menuTemplate').html());
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	}
	
});