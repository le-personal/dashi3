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
    var language = req.param("language");
    if (term && req.isSocket) {
    	Passport.findOne({user: req.session.passport.user, provider: "twitter"}).
    	exec(function(err, data) {
    		if(err) console.log(err);
    		if(data) {
    			if(data.tokens.token && data.tokens.tokenSecret) {
						var T = new Twit({
						  consumer_key: process.env.TWITTER_APIKEY,
						  consumer_secret: process.env.TWITTER_APISECRET,
						  access_token: data.tokens.token,
						  access_token_secret: data.tokens.tokenSecret
						});

						console.log("looking for tweets with the word: " + term + " using the language " + language);
			    	var stream = T.stream("statuses/filter", {track: term, language: language});

			    	stream.on("tweet", function(tweet) {
			    		sails.sockets.emit(sails.sockets.id(req.socket), "twitter:stream:" + term.replace(" ", "_"), {tweet: tweet});
			    	});

			    	sails.io.on("disconnect", function(socket) {
			    		stream.stop();
			    	});
    			}
    		}
    	});
    }
	},

	search: function(req, res) {

	},

	username: function(req, res) {
		var term = req.param('username');
    var counter = 0;
    if (term && req.isSocket) {
    	Passport.findOne({user: req.session.passport.user, provider: "twitter"}).
    	exec(function(err, data) {
    		if(err) console.log(err);
    		if(data) {
    			if(data.tokens.token && data.tokens.tokenSecret) {
						var T = new Twit({
						  consumer_key: process.env.TWITTER_APIKEY,
						  consumer_secret: process.env.TWITTER_APISECRET,
						  access_token: data.tokens.token,
						  access_token_secret: data.tokens.tokenSecret
						});
						
						console.log("Looking for tweets of the username: " + username);
			    	var stream = T.stream("user");

			    	stream.on("tweet", function(tweet) {
			    		counter++;
			    		sails.sockets.emit(sails.sockets.id(req.socket), "twitter:username:" + term.replace(" ", "_"), {tweet: tweet});

			    		if(counter > 10) {
			    			console.log("Found 10 tweets");
			    			counter = 0;
			    		}
			    	});

			    	sails.io.on("disconnect", function(socket) {
			    		stream.stop();
			    	});
    			}
    		}
    	});
    }
	}

};

