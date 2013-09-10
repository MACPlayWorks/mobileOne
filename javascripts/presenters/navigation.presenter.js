var NavigationPresenter = Backbone.View.extend({
	el: '#navigation',
	
	events: {
		'click .menu': 'toggleMenu'
	},
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#navigationTemplate').html());
		this.render();
		
		$('#application > .navigationOverlay').click(function() {
			app.navigation('hide');
		})
	},
	
	render: function() {
		this.$el.html(this.template({view: this.model.currentView}));
		
		return this;
	},
});