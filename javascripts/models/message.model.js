var MessageModel = Backbone.Model.extend({});

var MessageCollection = Backbone.Collection.extend({
	url: function() {
		return 'https://np-services.airmiles.ca/lig/amrp/message.json?max=' + this.max + '&bucketid=' + this.bucketId;
	},
	model: MessageModel,
	
	initialize: function(attr) {
		attr = attr || {};
		this.max = attr.max || 1;
		this.bucketId = attr.bucketId || 'mobileAppMessage';
	}
});
