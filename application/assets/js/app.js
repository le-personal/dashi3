(function() {
	'use strict';

	var msnry = new Masonry("#page", {
		itemSelector: '.item',
		columnWidth: 200,
	});

	angular.module("dashi3",  [
		'ngResource',
		'chart.js', 
		'ui.bootstrap',
		'ngSails'
	]);	
})();

