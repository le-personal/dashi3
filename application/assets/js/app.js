
(function() {
	'use strict';

	angular.module("dashi3", [
		'ngResource',
		'chart.js',
		'ui.bootstrap',
		'ngSails',
		'colorpicker.module',
		"gridster"
	])

	// Use it to exports a Globals variable object
	.factory("Globals", function() {
		return {
			// packeryContainer: container
		};
	});

})();
