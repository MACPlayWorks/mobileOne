document.addEventListener("webworksready", function() {
	// This function may need to change. May initialize on device ready event instead of page load.

	console.log('mobile app initialized');
	
	// Let's create a globally accessible application.
	window.app = new Application();	// Let's create an event bus
	
	console.log('application initialized', app);
});
