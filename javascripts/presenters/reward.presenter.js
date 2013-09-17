var RewardPresenter = Backbone.View.extend({
	el: '#reward',
	
	initialize: function() {	// Expect a Collector model
		this.template = _.template($('#rewardTemplate').html());
		this.listenTo(this.model, 'change', this.render);
		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template({reward: this.model.attributes }));
		
		return this;
	}

});