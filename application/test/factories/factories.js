var Chance = require("chance");

module.exports = function(Factory) {
	Factory.define("dashboard", "Dashboard")
		.attr("name", new Chance().word())
		.attr("description", new Chance().string())
		.attr("path", new Chance().word());

	Factory.define('storageMessage', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'message')
	  .attr("description", new Chance().word());

	Factory.define('storageCompletion', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'completion')
	  .attr("description", new Chance().word());

	Factory.define('storageCounter', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'counter')
	  .attr("description", new Chance().word());

	Factory.define('storageGraph', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'graph')
	  .attr("description", new Chance().word());

	Factory.define('storageStatus', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'status')
	  .attr("description", new Chance().word());

	Factory.define('storageMap', "Storage")
	  .attr('name', new Chance().word())
	  .attr('type', 'map')
	  .attr("description", new Chance().word());

	Factory.define('dataMessage', "Data")
		.parent("storageMessage")
	  .attr('value', {
	  	value: {
		  	title: new Chance().sentence({words: 5}),
		  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
		  	content: new Chance().paragraph({sentences: 2}),
		  	link: new Chance().url({domain: "wikipedia.org"})
	  	}
	  });

	Factory.define('dataCompletion', "Data")
		.parent("storageCompletion")
	  .attr('value', {
	  	value: {
		  	current: new Chance().natural({min: 0, max: 100}),
		  	min: 0,
		  	max: 100
	  	}
	  });

	Factory.define('dataCounter', "Data")
		.parent("storageCounter")
	  .attr('value', {
	  	value: new Chance().natural({min: 10, max: 100})
	  });

	Factory.define('dataGraph', "Data")
		.parent("storageGraph")
	  .attr('value', {
	  	value: new Chance().natural({min: 10, max: 100})
	  });	

	Factory.define('dataStatus', "Data")
		.parent("storageStatus")
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
		.parent("storageCounter")
		.parent("dashboard");
}
