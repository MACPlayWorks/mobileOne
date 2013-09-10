$(function() {
	// This function may need to change. May initialize on device ready event instead of page load.

	console.log('mobile app initialized');
	
	// Let's create a globally accessible application.
	var app = new Application();	// Let's create an event bus
	
	window.app = app;	// Make app global (DEBUG only!)
	
});