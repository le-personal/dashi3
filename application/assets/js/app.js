(function() {
	'use strict';

	// init packery
	var $container = $('#page').packery({
	  itemSelector: '.item',
	  gutter: 10,
		columnWidth: 60,
		rowHeight: 120
	});

	$container.find('.item').each( function( i, itemElem ) {
	  // make element draggable with Draggabilly
	  var draggie = new Draggabilly( itemElem );
	  // bind Draggabilly events to Packery
	  $container.packery( 'bindDraggabillyEvents', draggie );
	});
	

	angular.module("dashi3",  [
		'ngResource',
		'chart.js', 
		'ui.bootstrap',
		'ngSails',
		'colorpicker.module'
	]);	
})();

