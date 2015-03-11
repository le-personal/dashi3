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
		storage: {
			model: "Storage"
		},
		dashboard: {
			model: "Dashboard"
		},
		row: {
			type: "integer",
			required: true,
			defaultsTo: 1
		},
		col: {
			type: "integer",
			required: true,
			defaultsTo: 1
		}
	}
}
