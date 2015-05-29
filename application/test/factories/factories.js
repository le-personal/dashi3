var Chance = require("chance");
var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = function(Factory) {
	Factory.define("dashboard", "Dashboard")
		.attr("name", function() {
			return new Chance().word();
		})
		.attr("description", function() {
			return new Chance().string();
		})
		.attr("public", false)
		.attr("path", function() {
			return new Chance().word();
		});

	Factory.define("user", "User")
		.attr("username", function() {
			return new Chance().word();
		})
		.attr("password", function() {
			return new Chance().word();
		});

	Factory.define('widgetMessage', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
	  .attr('type', 'messages')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetCompletion', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
	  .attr('type', 'completion')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetCounter', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
		.attr('type', 'counter')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetSingleLineGraph', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
		.attr('type', 'singlelinegraph')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetSeriesGraph', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
		.attr('type', 'seriesgraph')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetStatus', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
		.attr('type', 'status')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('widgetMap', "Widgets")
		.attr("title", function() {
			return new Chance().sentence({words: 5});
		})
		.attr("description", function() {
			return new Chance().sentence({words: 10});
		})
		.attr("weight", 0)
		.attr("backgroundColor", "#fff")
		.attr("textColor", "#000")
		.parent("dashboard")
		.attr('type', 'map')
		.attr("id", function() {
			return new Chance().string({length: 32, pool: pool});
		});

	Factory.define('dataMessage', "Data")
	  .attr('value', {
	  	value: function() {
	  		var obj = {
	  			title: new Chance().sentence({words: 5}),
	  			image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
	  			content: new Chance().paragraph({sentences: 2}),
	  			link: new Chance().url({domain: "wikipedia.org"})
	  		};

	  		return obj;
	  	}
	  });

	Factory.define('dataCompletion', "Data")
	  .attr('value', {
	  	value: function() {
	  		var obj = {
	  			current: new Chance().natural({min: 0, max: 100}),
	  			min: 0,
	  			max: 100
	  		}

	  		return obj;
	  	}
	  });

	Factory.define('dataCounter', "Data")
	  .attr('value', {
	  	value: function() {
	  		return new Chance().natural({min: 10, max: 100});
	  	}
	  });

	Factory.define('dataSingleLineGraph', "Data")
	  .attr('value', {
	  	value: function() {
	  		return new Chance().natural({min: 10, max: 100});
	  	}
	  });

	Factory.define('dataStatus', "Data")
	  .attr('value', {
	  	status: "error"
	  });

	Factory.define('dataMap', "Data")
	  .attr('value', {
	  	value: function() {
	  		var obj = {
	  			longitude: new Chance().longitude(),
	  			latitude: new Chance().latitude(),
	  			value: new Chance().natural({min: 10, max: 100})
	  		}

	  		return obj;
	  	}
	  });

	Factory.define("token", "Token")
		.attr("token", function () {
			return new Chance().string()
		})
		.parent("user");
}
