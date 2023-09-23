module.exports = {
    '/api/v1/seat': {
        get: {
            tags: ['Seats'],
            summary: 'Get all seats',
            produces: ['application/json'],
            parameters: [
                {
                    $ref: '#/components/parameters/offset'
                },
                {
                    $ref: '#/components/parameters/limit'
                }
            ],
            responses: {
                200: {
                    description: 'All seats are fetched',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        $ref: '#/components/content/success',
                                    },
                                    message: {
                                        $ref: '#/components/content/message',
                                    },
                                    statusCode: {
                                        $ref: '#/components/content/statusCode',
                                    },
                                    count: {
                                        $ref: '#/components/content/count'
                                    },
                                    data: {
                                        $ref: '#/components/content/data'
                                    },
                                }
                            }
                        }
                    }
                },
            },
        },
    },

    '/api/v1/seat/:vehicleId': {
        get: {
            tags: ['Seats'],
            summary: 'Retrieve all seats of given vehicleId',
            produces: ['application/json'],
        },
        responses: {
            200: {
                description: 'All seats are fetched',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                success: {
                                    $ref: '#/components/content/success',
                                },
                                message: {
                                    $ref: '#/components/content/message',
                                },
                                statusCode: {
                                    $ref: '#/components/content/statusCode',
                                },
                                data: {
                                    $ref: '#/components/content/data'
                                },
                            }
                        }
                    }
                }
            },
        },
    },
}