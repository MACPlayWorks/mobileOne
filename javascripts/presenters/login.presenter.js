var LoginPresenter = Backbone.View.extend({
	el: '#login',
	
	events: {
		'click .login': 'onLogin'
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
	
	onLogin: function() {
		if (this.validate()) {
			console.log('valid collector number');
			var collectorModel = new CollectorModel();
			// Set the api key and collector number
			$.ajaxSetup({
				'X-LO-COLLECTOR-NUM': '84097232197',
				'X-LO-API-CLIENT-KEY': '605ef001-3fe1-4c20-a2b5-ad498e15a315'
			});
			collectorModel.fetch({
				success: function() {
					console.log('logged In! YAY', arguments);
				},
				error: function() {
					console.log('error', arguments);
				}
			});
		} else {
			console.log('invalid collector number');
		}
	},

	// Validate the Form (colletor number)
	validate: function() {
		return !!this.$('.collectorNumber').val().match(/^\d{11}$/);
	}

});
