var Chance = require("chance");

module.exports = function(Factory) {
	Factory.define("dashboard", "Dashboard")
		.attr("name", new Chance().word())
		.attr("description", new Chance().string())
		.attr("path", new Chance().word());

	Factory.define('storage', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'number')
	  .attr("description", new Chance().word());

	Factory.define('datafloat', "Datafloat")
		.parent("storage")
	  .attr('value', new Chance().floating({fixed: 4}))
	  .attr("definition", "units");

	Factory.define('datanumber', "Datanumber")
		.parent("storage")
	  .attr('value', new Chance().natural({min: 1, max: 20000}))
	  .attr("definition", "units");

	Factory.define('datamessages', "Datamessages")
		.parent("storage")
	  .attr('message', new Chance().sentence({words: 5}))
	  .attr("type", "info");
}
