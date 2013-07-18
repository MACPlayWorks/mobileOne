(function(namespace) {

	console.log('mobile app initialized');
	
	// Let's create a globally accessible application.
	var app = new Application();	// Let's create an event bus

	// Initialization code here
	
	window.app = app;	// Make app global
	
})(window);