const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bookstore API Documentation",
            version: "1.0.0",
            description: "API documentation for the bookstore management system",
        },
        servers: [
            {
                url: "http://localhost:5000", 
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
