var Chance = require("chance");

module.exports = function(Factory) {
	Factory.define("dashboard", "Dashboard")
		.attr("name", new Chance().word())
		.attr("description", new Chance().string())
		.attr("path", new Chance().word());

	Factory.define('storageNumber', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'number')
	  .attr("description", new Chance().word());

	Factory.define('storageFloat', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'float')
	  .attr("description", new Chance().word());

	Factory.define('storageMessages', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'messages')
	  .attr("description", new Chance().word());

	Factory.define('datafloat', "Datafloat")
		.parent("storageFloat")
	  .attr('value', new Chance().floating({fixed: 2, min: 0, max: 100}))
	  .attr("definition", "units");

	Factory.define('datanumber', "Datanumber")
		.parent("storageNumber")
	  .attr('value', new Chance().natural({min: 1, max: 20000}))
	  .attr("definition", "units");

	Factory.define('datamessages', "Datamessages")
		.parent("storageMessages")
	  .attr('message', new Chance().sentence({words: 5}))
	  .attr("type", "info");

	Factory.define("widget", "Widgets")
		.attr("title", new Chance().sentence({words: 5}))
		.attr("description", new Chance().sentence({words: 10}))
		.attr("template", "number")
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("storageNumber")
		.parent("dashboard");
}
