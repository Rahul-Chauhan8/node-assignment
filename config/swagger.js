const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    opneapi: "3.0.0",
    info: {
      description: "Top tipper Api's.",
      title: "Top Tipper Project",
      version: "1.0.0",
    },
   host: process.env.BASE_URL,
  },
  apis: [],
};


const swaggerSpec = swaggerJsdoc(options);
swaggerSpec.tags = ["Admin", "SalesRepresentative"];

swaggerSpec.paths = {
  "/auth/login": {
    post: {
      tags: ["auth"],
      summary: "Login Api",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          type: "object",
          schema: {
            properties: {
              email: {
                type: "string",
                default: "admin@yopmail.com",
              },
              password: {
                type: "string",
                default: "123456",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
 
};

swaggerSpec.securityDefinitions = {
  authorization: {
    type: "apiKey",
    name: "authorization",
    in: "header",
  },
};

module.exports = swaggerSpec;
