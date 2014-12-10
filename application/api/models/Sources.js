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
		},
		type: {
			type: "string",
			required: true,
			enum: ["number", "float", "text"]
		},
		description: {
			type: "string",
			required: true,
		}
	}
}