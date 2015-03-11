
(function() {
	'use strict';

	// init packery
	// var container = $('#page').packery({
	//   itemSelector: '.item',
	//   gutter: 10,
	// 	columnWidth: 60,
	// 	rowHeight: 120
	// });

	var gridster = $(".gridster ul").gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [250, 200],
    widget_selector: "li",
    draggable: {
    	handle: "header",
    	stop: function(event, ui) {
    		console.log("Stopped moving");
    		console.log(event);
    		console.log(ui);
    	}
    },
  }).data("gridster");

  

  // console.log(gridster);

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
			// packeryContainer: container
		};
	});

})();

