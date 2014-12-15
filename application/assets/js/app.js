(function() {
	'use strict';

	// init packery
	var container = $('#page').packery({
	  itemSelector: '.item',
	  gutter: 10,
		columnWidth: 60,
		rowHeight: 120
	});

	angular.module("dashi3", [
		'ngResource',
		'chart.js', 
		'ui.bootstrap',
		'ngSails',
		'colorpicker.module'
	])

	// Use it to exports a Globals variable object
	.factory("Globals", function() {
		return {
			packeryContainer: container
		};
	});

})();

