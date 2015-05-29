var Token = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    token  : { type: 'string', unique: true },
    user : { model: "user" }
  }
};

module.exports = Token;