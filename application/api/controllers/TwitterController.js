/**
 * TwitterController
 *
 * @description :: Server-side logic for managing Twitters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Twit = require('twit')

module.exports = {
	stream: function(req, res){
    var term = req.param('term');
    var language = req.param("language") ? req.param("language") : "en";
    if (term && req.isSocket) {
    	var data = sails.config.settings;

			if(data.twitter_token && data.twitter_token_secret) {
				var T = new Twit({
				  consumer_key: process.env.TWITTER_APIKEY,
				  consumer_secret: process.env.TWITTER_APISECRET,
				  access_token: data.twitter_token,
				  access_token_secret: data.twitter_token_secret
				});

	    	var stream = T.stream("statuses/filter", {track: term, language: language});

	    	stream.on("tweet", function(tweet) {
	    		sails.sockets.emit(sails.sockets.id(req.socket), "twitter:stream:" + term.replace(" ", "_"), {tweet: tweet});
	    	});

	    	sails.io.on("disconnect", function(socket) {
	    		stream.stop();
	    	});
			}
    }
	},

	search: function(req, res) {

	},

	username: function(req, res) {
		// Not going to work
		var username = req.params.username;
    var counter = 0;
		
    if (username && req.isSocket) {
    	config.all()
    	.then(function(data) {
				if(data.twitter_token && data.twitter_token_secret) {
					console.log("Twitter configured");

					var T = new Twit({
					  consumer_key: process.env.TWITTER_APIKEY,
					  consumer_secret: process.env.TWITTER_APISECRET,
					  access_token: data.twitter_token,
					  access_token_secret: data.twitter_token_secret
					});
					
					console.log("Looking for tweets of the username: " + username);
		    	var stream = T.stream("user");

		    	stream.on("tweet", function(tweet) {
		    		counter++;
		    		sails.sockets.emit(sails.sockets.id(req.socket), "twitter:username:" + username, {tweet: tweet});

		    		if(counter > 10) {
		    			console.log("Found 10 tweets");
		    			counter = 0;
		    		}
		    	});

		    	sails.io.on("disconnect", function(socket) {
		    		stream.stop();
		    	});
				}
    	});

    }
	}

};

