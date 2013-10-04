var createUrlParams = function(attributes) {
	var attr = attributes || {};
	//console.log(attr, Object.keys(attr));
	
	var attrbuteList = [];
	Object.keys(attr).forEach(function(key) {
		attrbuteList.push(key + '=' + attr[key]);	// {key}={value}
	});
	
	return attrbuteList.join('&');
};

var SponsorModel = Backbone.Model.extend ({
	idAttribute: 'id',
	defaults: {verbosity: 5},
	url: function() {
			return 'https://np-services.airmiles.ca/lig/amrp/Sponsor/' + this.id + '.json?verbosity=' + this.attributes.verbosity;
	}
});


var SponsorCategoryCollection = Backbone.Collection.extend ({
	url: 'https://np-services.airmiles.ca/lig/amrp/SponsorCategory.json'
});

var SponsorTagCollection = Backbone.Collection.extend ({
	url: 'https://np-services.airmiles.ca/lig/amrp/SponsorTag.json'
});

var SponsorCollection = Backbone.Collection.extend ({	
	
	url: function() {
		return 'https://np-services.airmiles.ca/lig/amrp/Sponsor.json?' + createUrlParams(this.attributes);
	},
	
	model: SponsorModel,
	
	initialize: function(data, options) {
		var opt = options || {};
		
		this.attributes = {};
		
		if (opt.categoryId) {
			this.attributes.category = opt.categoryId;
		}
		this.attributes.verbosity = opt.verbosity || 5;
		this.attributes.limit = opt.limit || 20;
	}
});

