var Token = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
  	name: {
  		type: "string", required: true,
  	},
    token: { 
    	type: 'string', 
    	unique: true,
    	required: true 
   	},
    user: { 
    	model: "user"
    }
  }
};

module.exports = Token;