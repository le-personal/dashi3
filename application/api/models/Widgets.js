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
		template: {
			type: "string",
			required: true
		},
		weight: {
			type: "integer",
			required: false,
			defaultsTo: 0
		},
		textToAppend: {
			type: "string",
			required: false
		},
		backgroundColor: {
			type: "string",
			required: false
		},
		textColor: {
			type: "string",
			required: false
		},
		source: {
			model: "Sources"
		},
		dashboard: {
			model: "Dashboard"
		}
	}
}
