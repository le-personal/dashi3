(function() {
	'use strict';

	var $container = $('#page');
	// init
	$container.packery({
	  itemSelector: '.item',
	  gutter: 10,
		columnWidth: 60


	});

	angular.module("dashi3",  [
		'ngResource',
		'chart.js', 
		'ui.bootstrap',
		'ngSails',
		'colorpicker.module'
	]);	
})();

