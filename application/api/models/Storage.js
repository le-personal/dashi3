module.exports = {
	attributes: {
		id: {
			type: "integer",
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: "string",
			required: true,
			unique: true
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
		}
	}
}