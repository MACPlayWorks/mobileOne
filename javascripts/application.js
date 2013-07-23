// Global Event Bus
var Application = function(options) {
	this.options = options || {};
	this.initialize.apply(this, arguments);
};

_.extend(Application.prototype, Backbone.Events, {
	
	presenters: {},
	
	initialize: function() {
		this.presenters.login = new LoginPresenter({model: new CollectorModel()});
		
		// Initialization code here

	},
	
	menu: function(options) {
		if (options === 'show') {
			$('#application').addClass('menu');
		} else if (options === 'hide'){
			$('#application').removeClass('menu');
		} else if (options === 'toggle') {
			$('#application').toggleClass('menu');
		}
	}
});
	