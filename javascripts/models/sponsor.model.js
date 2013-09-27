var SponsorModel = Backbone.Model.extend ({
	idAttribute: 'id',
	defaults: {verbosity: 10},
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
	
	defaults: {
	verbosity: 10,
	limit: 10
	},
	
	url: function(){
		return 'https://np-services.airmiles.ca/lig/amrp/Sponsor.json?verbosity=' + this.attributes.verbosity + '&limit=' + this.attributes.limit;
	},
	
	model: SponsorModel,
});