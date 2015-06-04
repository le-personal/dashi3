$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});

(function() {
	'use strict';

	angular.module("dashi3", [
		'ngResource',
		'ngRoute',
		'chart.js',
		'ui.bootstrap',
		'ngSails',
		'colorpicker.module',
		"gridster",
		"toggle-switch"
	])

	// Use it to exports a Globals variable object
	.factory("Globals", function() {
		return {
			// packeryContainer: container
		};
	});

})();
