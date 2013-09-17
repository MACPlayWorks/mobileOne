var RewardModel = Backbone.Model.extend({
	idAttribute: 'id',
	url: function() {
		if (this.attributes && this.attributes.productId) {
			return 'https://np-services.airmiles.ca/lig/amrp/rewardDetail.json?productId=' + this.attributes.productId;
		} else {
			return 'https://np-services.airmiles.ca/lig/amrp/rewardDetail.json?productId=' + this.id;
		}
	}
});

var RewardCategoryModel = Backbone.Model.extend({
	url: 'https://np-services.airmiles.ca/lig/amrp/rewardCategories.json'
});

var RewardCollection = Backbone.Collection.extend({
	url: function() {
		console.log('url', this);
		return 'https://np-services.airmiles.ca/lig/amrp/rewardListing.json?selectedCategoryId=' + this.categoryId
	},
	model: RewardModel,

	initialize: function(categoryId) {
		this.categoryId = categoryId;
	},

	parse: function(response) {
		return response.products;
	}
});