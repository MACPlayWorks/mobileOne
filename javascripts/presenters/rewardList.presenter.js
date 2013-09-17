var RewardListPresenter = Backbone.View.extend({
	el: '#rewardList',
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#rewardListTemplate').html());
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'reset', this.render);
		
		this.render();
	},
	
	render: function() {
		// TODO infinite scroll
		this.$el.html(this.template({ rewardList: this.collection.slice(0, 10) }));
		
		return this;
	}

});