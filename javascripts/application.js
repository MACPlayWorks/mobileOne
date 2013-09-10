// Global Event Bus
var Application = function(options) {
	this.options = options || {};
	this.initialize.apply(this, arguments);
};

_.extend(Application.prototype, Backbone.Events, {
	
	presenters: {},
	
	initialize: function() {
		// Initialization code here
		this.presenters.navigation = new NavigationPresenter();
		this.presenters.login = new LoginPresenter({model: new CollectorModel()});
		
		if (blackberry) {
			blackberry.event.addEventListener('swipedown', this.navigation);
		}
	},
	
	navigation: function(options) {
		if (options === 'show') {
			$('#application').addClass('navigation');
		} else if (options === 'hide'){
			$('#application').removeClass('navigation');
		} else {
			$('#application').toggleClass('navigation');
		}
	},
	
	closeNavigation: function() {
		this.navigation('hide');
	},
	
	changeView: function(view) {
		if (this.presenters[view]) {
			$('#application').attr('page', view);
		}
	}
});
	