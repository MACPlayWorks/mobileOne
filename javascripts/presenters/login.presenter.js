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
			var setHeader = function (xhr) {
                xhr.setRequestHeader('X-LO-COLLECTOR-NUM', '50001366854');
                xhr.setRequestHeader('X-LO-API-CLIENT-KEY', '0c921fb9-8e73-4349-bef5-e7960551b4ca');
                xhr.setRequestHeader('Accept-Language', 'en-CA');
                xhr.setRequestHeader('X-LO-DEVICE-ID', 'BB10');
                 }
			collectorModel.fetch({
				beforeSend: setHeader,
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
