module.exports = {
  '/api/v1/vehicle': {
    get: {
      tags: ['Vehicles (Authorization header required for creating vehicle)'],
      summary: 'Get All Vehicles With Seat Details',
      produces: ['application/json'],
      parameters: [
        {
          $ref: '#/components/parameters/offset'
        },
        {
          $ref: '#/components/parameters/limit'
        },
        {
          $ref: '#/components/parameters/categoryId'
        }
      ],
      responses: {
        200: {
          description: 'All Vehicles are fetched',
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

  '/api/v1/vehicle/create': {
    post: {
      tags: ['Vehicles (Authorization header required for creating vehicle)'],
      summary: 'Create  Vehicles',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                categoryId: {
                  type: 'string',
                },
                regNo: {
                  type: 'string',
                }
              },
              required: ['categoryId', 'categoryId', 'Authorization Token']
            },
          },
        },
        responses: {
          201: {
            description: 'A vehicle is created successfully.'
          },
        },
      },
    },
  },
}