module.exports = {
	attributes: {
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
		type: {
			type: "string",
			required: true
		},
		dashboard: {
			model: "Dashboard",
			required: false
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
			enum: [1, 2, 3, 4, 5, 6]
		},
		sizeY: {
			type: "integer",
			required: true,
			defaultsTo: 1,
			enum: [1, 2, 3, 4, 5, 6]
		},
		settings: {
			type: "json",
			required: false
		}
	}
}
