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
	
	url: function(){
		return 'https://np-services.airmiles.ca/lig/amrp/Sponsor.json?verbosity=' + this.verbosity + '&limit=' + this.limit;
	},
	
	model: SponsorModel,
	
		
	initialize: function(verbosity, limit) {
		this.verbosity = verbosity;
		this.limit = limit;
	}
});


var SponsorCategoryListCollection = Backbone.Collection.extend ({	
	
	url: function(){
		return 'https://np-services.airmiles.ca/lig/amrp/Sponsor.json?category=' + this.category +'&verbosity=' + this.verbosity + '&limit=' + this.limit;
	},
	
	model: SponsorModel,
	
		
	initialize: function(category, verbosity, limit) {
		this.category = category;
		this.verbosity = verbosity;
		this.limit = limit;
	}
});