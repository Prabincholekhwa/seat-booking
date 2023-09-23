module.exports = {
  '/api/v1/booking/create/:seatId': {
    post: {
      tags: ['Bookings(Authorization header required)'],
      summary: 'Books a specific seat(seatId) of vehicle(authorization headers required to make booking), here the bookingStatus remains pending.',
    },
  },
  '/api/v1/booking/confirm/:bookingId': {
    post: {
      tags: ['Bookings(Authorization header required)'],
      summary: 'Confirm bookingStatus of that booking id, BookingStatus updates to confirmed',
    },
  },
  '/api/v1/booking/cancel/:bookingId': {
    post: {
      tags: ['Bookings(Authorization header required)'],
      summary: 'Cancels bookingStatus of that booking id if its not confirmed, BookingStatus updates to cancel',
    },
  },
  '/api/v1/booking/:bookingId': {
    get: {
      tags: ['Bookings(Authorization header required)'],
      summary: 'Get bokingId Details',
      produces: ['application/json'],
      responses: {
        200: {
          message: 'BookingId details are fetched',
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
  },
  '/api/v1/booking': {
    get: {
      tags: ['Bookings(Authorization header required)'],
      summary: 'Get My Bookings',
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
        },
        {
          $ref: '#/components/parameters/vehicleId'
        },
        {
          $ref: '#/components/parameters/bookingStatus'
        }
      ],
      responses: {
        200: {
          message: 'All of your Bookings are fetched.',
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
}