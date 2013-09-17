var LoginPresenter = Backbone.View.extend({
	el: '#login',
	
	events: {
		'click .login': 'doLogin',
		'keypress .collectorNumber': 'onKey'
	},
	
	initialize: function() {
		this.template = _.template($('#loginTemplate').html());
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this;
	},
	
	onKey: function(event) {
		if (event.which === 13) {	// Enter button
			this.$('.login').click();	// Do login
		}
	},
	
	doLogin: function(event) {
		if (this.validate()) {
			app.login(this.$('.collectorNumber').val());
		} else {
			console.log('invalid collector number');
		}
	},

	// Validate the Form (colletor number)
	validate: function() {
		return !!this.$('.collectorNumber').val().match(/^\d{11}$/);
	}

});
