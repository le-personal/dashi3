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
		label: {
			type: "string",
			required: false
		},
		template: {
			type: "string",
			required: true
		},
		storage: {
			model: "Storage",
			required: false,
		},
		dashboard: {
			model: "Dashboard",
			required: true
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
		},
		sizeX: {
			type: "integer",
			required: true,
			defaultsTo: 1,
			enum: [1, 2]
		},
		sizeY: {
			type: "integer",
			required: true,
			defaultsTo: 1,
			enum: [1, 2]
		}
	}
}
