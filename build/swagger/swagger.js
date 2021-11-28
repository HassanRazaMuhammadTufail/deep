"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = {
    swagger: '2.0',
    info: {
        description: "These are Deep Consulting Solutions Technical Assessment API's",
        version: '1.0.0',
        title: "Inventory API's",
        contact: {
            email: 'hassanrazamohammadtufail@gmail.com',
        },
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
    },
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/',
    paths: {
        '/{item}/quantity': {
            get: {
                summary: ' get non-expired quantity of the item from the system',
                description: ' get non-expired quantity of the item from the system',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'item',
                        in: 'path',
                        description: 'item that need to fetch',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        schema: {
                            type: 'object',
                            properties: {
                                quantity: {
                                    type: 'integer',
                                },
                                validTill: {
                                    type: 'integer',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                        schema: {
                            $ref: '#/definitions/InvalidResponse',
                        },
                    },
                },
            },
        },
        '/{item}/add': {
            post: {
                summary: 'Add a lot of :item to the system',
                description: 'Add a lot of :item to the system',
                produces: ['application/json'],
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'item',
                        in: 'path',
                        description: 'item that need to add',
                        required: true,
                        type: 'string',
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'body object',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                quantity: {
                                    type: 'integer',
                                },
                                expiry: {
                                    type: 'integer',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    201: {
                        description: 'successful operation',
                        schema: {
                            type: 'object',
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                        schema: {
                            $ref: '#/definitions/InvalidResponse',
                        },
                    },
                },
            },
        },
        '/{item}/sell': {
            post: {
                summary: 'sell a quantity of an item',
                description: 'sell a quantity of an item and reduce its inventory from the database.',
                produces: ['application/json'],
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'item',
                        in: 'path',
                        description: 'item that need to sell',
                        required: true,
                        type: 'string',
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'body object',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                quantity: {
                                    type: 'integer',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        schema: {
                            type: 'object',
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                        schema: {
                            $ref: '#/definitions/InvalidResponse',
                        },
                    },
                },
            },
        },
    },
    definitions: {
        InvalidResponse: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'string',
                },
                message: {
                    type: 'string',
                },
            },
        },
    },
};
exports.default = swagger;
//# sourceMappingURL=swagger.js.map