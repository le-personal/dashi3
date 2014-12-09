(function() {
	'use strict';

	var msnry = new Masonry("#page", {
		itemSelector: '.item',
		columnWidth: 200,
	});

	angular.module("dashi3",  [
		'chart.js', 
		'ui.bootstrap',
	]);	
})();

