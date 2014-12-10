module.exports = {
	attributes: {
		id: {
			type: "integer",
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: "string",
			required: true
		},
		description: {
			type: "text",
			required: false
		},
		source: {
			model: "Sources"
		},
		template: {
			type: "string",
			required: true
		},
		weight: {
			type: "integer",
			required: false,
			defaultsTo: 0
		}
	}
}