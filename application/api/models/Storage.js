var randtoken = require('rand-token');

module.exports = {
	attributes: {
		id: {
			type: "string",
			required: true,
			unique: true,
			alphanumericdashed: true,
			primaryKey: true
		},
		name: {
			type: "string",
			required: true
		},
		type: {
			type: "string",
			required: true,
			enum: [
				"message",
				"completion",
				"counter",
				"graph",
				"status",
				"map"
			]
		},
		description: {
			type: "string",
			required: true,
		},
		access_token: {
			type: "string",
			required: false
		}
	},

	beforeCreate: function(values, done) {
		// set the token

		// var token = randtoken.generate(32);
		// values.access_token = token;
		done();
	}
}
