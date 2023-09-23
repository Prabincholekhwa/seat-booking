module.exports = {
  '/api/v1/category': {
    get: {
      tags: ['Categories'],
      summary: 'Get All Categories',
      produces: ['application/json'],
      parameters: [
        {
          $ref: '#/components/parameters/offset'
        },
        {
          $ref: '#/components/parameters/limit'
        },
        {
          $ref: '#/components/parameters/order',
        },
        {
          $ref: '#/components/parameters/sort',
        },
        {
          $ref: '#/components/parameters/search',
        }
      ],
      responses: {
        200: {
          description: 'All Categories are fetched',
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

  '/api/v1/category/create': {
    post: {
      tags: ['Categories'],
      summary: 'Create  a Category',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                row: {
                  type: 'number'
                },
                column: {
                  type: 'number'
                }
              },
              required: ['name', 'description', 'row', 'column']
            },
          },
        },
        responses: {
          201: {
            description: 'A category is created successfully.'
          },
        },
      },
    },
  },
}