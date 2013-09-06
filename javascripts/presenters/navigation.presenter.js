var NavigationPresenter = Backbone.View.extend({
	el: '#navigation',
	
	events: {
		'click .menu': 'toggleMenu'
	},
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#navigationTemplate').html());
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	},
	
	toggleMenu: function() {
		$('#container').toggleClass('menu');
	}

});