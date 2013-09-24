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



        var setHeader1 = function (xhr) {
            xhr.setRequestHeader('X-LO-API-CLIENT-KEY', '0c921fb9-8e73-4349-bef5-e7960551b4ca');
            xhr.setRequestHeader('Accept-Language', 'en-CA');
            xhr.setRequestHeader('X-LO-DEVICE-ID', blackberry.identity.uuid);
            xhr.setRequestHeader('DEVICE_TYPE', 'BB10');
        };

        var setHeader2 = function (xhr) {
            if (app.collectorNumber) {
                xhr.setRequestHeader('X-LO-COLLECTOR-NUM', app.collectorNumber);
            }
            xhr.setRequestHeader('X-LO-API-CLIENT-KEY', '0c921fb9-8e73-4349-bef5-e7960551b4ca');
            xhr.setRequestHeader('Accept-Language', 'en-CA');
            xhr.setRequestHeader('X-LO-DEVICE-ID', blackberry.identity.uuid);
            xhr.setRequestHeader('DEVICE_TYPE', 'BB10');
        };
        $.ajaxSetup({
            beforeSend: setHeader1
        });
        var configModel = new ConfigModel();

        configModel.fetch({
            success: function(response) {
                console.log("Inside success");

                app.imageUrl=configModel.get("server-url-for-images");
                app.imageRewardCatPath=configModel.get("reward-cat-img-android-path");
                app.sponsorCatImagePath=configModel.get("sponsor-cat-img-android-path");
                app.featureRewardCatId=configModel.get("feature-reward-category-id");
                app.cashDailyLimit=configModel.get("cash_daily_limit");
                app.urlResetPin=configModel.get("url_reset_pin");
                app.urlCreatePin=configModel.get("url_create_pin");
                app.cashConversionFactor=configModel.get("cash_conversion_factor");
                app.urlForgetPin=configModel.get("url_forget_pin");
                app.urlUnsurePin=configModel.get("url_notsure_pin");
                app.urlCashVideo=configModel.get("url_cash_video");
                app.urlCashVideoFr=configModel.get("url_cash_video_fr");
                app.checkinRadius=configModel.get("checkin-radius");
            },
            error: function(errorResponse) {
                console.log(errorResponse);
            }
        });


		this.currentView = 'login';
		this.presenters.navigation = new NavigationPresenter({model: this});
		this.presenters.login = new LoginPresenter();

        $.ajaxSetup({
            beforeSend: setHeader2
        });
		
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
	