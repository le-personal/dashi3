var Chance = require("chance");
var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = function(Factory) {
	Factory.define("dashboard", "Dashboard")
		.attr("name", new Chance().word())
		.attr("description", new Chance().string())
		.attr("path", new Chance().word());

	Factory.define('storageMessage', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'message')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('storageCompletion', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'completion')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('storageCounter', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'counter')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('storageGraph', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'graph')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('storageStatus', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'status')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('storageMap', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'map')
		.attr("id", new Chance().string({length: 32, pool: pool}))
	  .attr("description", new Chance().word());

	Factory.define('dataMessage', "Data")
	  .attr('value', {
	  	value: {
		  	title: new Chance().sentence({words: 5}),
		  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
		  	content: new Chance().paragraph({sentences: 2}),
		  	link: new Chance().url({domain: "wikipedia.org"})
	  	}
	  });

	Factory.define('dataCompletion', "Data")
	  .attr('value', {
	  	value: {
		  	current: new Chance().natural({min: 0, max: 100}),
		  	min: 0,
		  	max: 100
	  	}
	  });

	Factory.define('dataCounter', "Data")
	  .attr('value', {
	  	value: new Chance().natural({min: 10, max: 100})
	  });

	Factory.define('dataGraph', "Data")
	  .attr('value', {
	  	value: new Chance().natural({min: 10, max: 100})
	  });

	Factory.define('dataStatus', "Data")
	  .attr('value', {
	  	status: "error"
	  });

	Factory.define('dataMap', "Data")
		.parent("storageMap")
	  .attr('value', {
	  	value: {
	  		longitude: new Chance().longitude(),
	  		latitude: new Chance().latitude(),
	  		value: new Chance().natural({min: 10, max: 100})
	  	}
	  });

	Factory.define("widget", "Widgets")
		.attr("title", new Chance().sentence({words: 5}))
		.attr("description", new Chance().sentence({words: 10}))
		.attr("template", "number")
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard");
}
