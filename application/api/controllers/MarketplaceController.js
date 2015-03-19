/**
 * MarketplaceController
 *
 * @description :: Server-side logic for managing Marketplaces
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var include = require("include");
var MarketplaceRepository = include("api/repositories/MarketplaceRepository");

module.exports = {
	index: function(req, res) {
		var marketplace = new MarketplaceRepository();
		marketplace.all(function(err, results) {
			if(err) return res.badRequest(err);
			console.log("Returning");
			console.log(results);
			return res.jsonp(200, results);
		});
	}
};
