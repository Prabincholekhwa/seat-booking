module.exports = {    
    '/api/v1/user/create': {
        post: {
          tags: ['Users'],
          summary: 'Register a User',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                    },
                    fullName: {
                      type: 'string',
                    },
                    phoneNumber:{
                        type:'string'
                    },
                    password:{
                        type:'string'
                    }
                }, 
                required: ['email','fullName', 'phoneNumber', 'password']
              },
            },
          },
          responses: {
            201: {
              description: 'A user is registered successfully.'
            },
          },
        },
        },
      },
      '/api/v1/user/verify': {
        post: {
          tags: ['Users'],
          summary: 'Verify user account through otp sent in user email(You can still login without email verified)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                    },
                    otpCode:{
                        type:'string'
                    }
                }, 
                required: ['email','otpCode']
              },
            },
          },
          responses: {
            201: {
              description: 'A user is verified successfully.'
            },
          },
        },
        },
      },

      '/api/v1/user/login': {
        post: {
          tags: ['Users'],
          summary: 'User Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                    },
                    password:{
                        type:'string'
                    }
                }, 
                required: ['email','password']
              },
            },
          },
          responses: {
            201: {
              description: 'Successful  Login',
              data: {
                "token":"",
                "expiresIn":"",
                "user":{
                  "id": "",
                  "email": ""
                }
              }
            },
          },
        },
        },
      },
  }