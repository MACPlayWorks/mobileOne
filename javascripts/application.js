// Global Event Bus
var Application = function(options) {
	this.options = options || {};
	this.initialize.apply(this, arguments);
};
_.extend(Application.prototype, Backbone.Events, {
	
	presenters: {},
	
	initialize: function() {
		this.presenters.login = new LoginPresenter({model: new CollectorModel()});
	},
	
});	
	