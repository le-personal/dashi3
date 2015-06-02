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
		.attr("isAdmin", function() {
			return false;
		})
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

	Factory.define("application", "Application")
		.attr("name", function() {
			return new Chance().string({pool: pool});
		})
		.attr("token", function () {
			return new Chance().string({pool: pool});
		})
		.parent("user");

	Factory.define('dataJSON', "Data")
		.parent("application")
		.attr("dataset", function() {
			return new Chance().word({pool: pool});
		})
	  .attr("content", function() {
	  	var obj = {
				title: new Chance().sentence({words: 5}),
				image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				content: new Chance().paragraph({sentences: 2}),
				link: new Chance().url({domain: "wikipedia.org"})
	  	}

	  	return obj;
	  });

	Factory.define("dataValue", "Data")
		.parent("application")
		.attr("dataset", function() {
			return new Chance().word();
		})
		.attr("content", function() {
			var obj = {
				value: new Chance().natural()
			}

			return obj;
		});

	Factory.define('dataLocation', "Data")
		.parent("application")
		.attr("dataset", function() {
			return new Chance().word();
		})
	  .attr('content', function() {
  		var obj = {
  			longitude: new Chance().longitude(),
  			latitude: new Chance().latitude(),
  			value: new Chance().natural({min: 10, max: 100})
  		}

  		return obj;
	  });
}
