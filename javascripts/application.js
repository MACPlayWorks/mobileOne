// Global Event Bus
var Application = function(options) {
	this.options = options || {};
	this.initialize.apply(this, arguments);
};

_.extend(Application.prototype, Backbone.Events, {
	
	presenters: {},
	
	initialize: function() {
		// Initialization code here
		this.presenters.menu = new MenuPresenter();
		this.presenters.menu = new NavigationPresenter();
		this.presenters.login = new LoginPresenter({model: new CollectorModel()});
		
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
	