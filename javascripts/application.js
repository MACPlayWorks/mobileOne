// Global Event Bus
var Application = function(options) {
	this.options = options || {};
	this.initialize.apply(this, arguments);
};

_.extend(Application.prototype, Backbone.Events, {
	
	presenters: {},
	
	initialize: function() {
		// Initialization code here
        //call config...populate values into global vars


        var self = this;


        var setHeader = function (xhr) {
            if (self.collectorNumber) {
                xhr.setRequestHeader('X-LO-COLLECTOR-NUM', app.collectorNumber);
            }
            xhr.setRequestHeader('X-LO-API-CLIENT-KEY', '0c921fb9-8e73-4349-bef5-e7960551b4ca');
            xhr.setRequestHeader('Accept-Language', 'en-CA');
            xhr.setRequestHeader('X-LO-DEVICE-ID', blackberry.identity.uuid);
            xhr.setRequestHeader('DEVICE_TYPE', 'BB10');
        };
        $.ajaxSetup({
            beforeSend: setHeader
        });
        var configModel = new ConfigModel();

        configModel.fetch({
            success: function(response) {
                console.log("Inside success");
                app.globalVars=configModel;
            },
            error: function(errorResponse) {
                console.log(errorResponse);
            }
        });


		this.currentView = 'login';
		this.presenters.navigation = new NavigationPresenter({model: this});
		this.presenters.login = new LoginPresenter();
		
		blackberry.event.addEventListener('swipedown', this.navigation);
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
			this.currentView = view;
			this.presenters.navigation.render();	// Update navigation view
		}
	},
	
	login: function(collectorNumber) {
		app.collectorNumber = collectorNumber;

		var collectorModel = new CollectorModel();
		collectorModel.fetch({
			success: function(collector) {
				app.presenters.home = new HomePresenter({model: collector});
				app.changeView('home');
				app.collector = collector
			},
			error: function() {
				console.log('error', arguments);
			}
		});
	}
});
	