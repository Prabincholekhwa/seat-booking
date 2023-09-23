import fs from "fs";
import _path from "path";
import swaggerJSDoc from "swagger-jsdoc";

import { appName, environment, hostUrl } from "../config";

const baseRoutes = _path.resolve("./swagger/routes");
const getPathRoutes = (path: string) => `${baseRoutes}${path}`;

const getDocs = (basePath: string, getPath: Function) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(getPath(`/${file}`));
    acc = {
      ...acc,
      ...data,
    };
    return acc;
  }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.1",
    servers: [
      {
        url: hostUrl,
        description: "Bookmundi Vehicle Booking Task Assesment",
      },
    ],
    components: {
      parameters: {
        offset: {
          in: "query",
          name: "offset",
          required: false,
          default: 1,
          description: "The offset for pagination.",
          type: "number"
        },

        limit: {
          in: "query",
          name: "limit",
          required: false,
          default: 10,
          description: "The number of items per page for pagination. If a value greater than 100 is provided, the API will automatically cap the result and return a page containing only the first 100 items.",
          type: "string"
        },
        categoryId: {
          in: "query",
          name: "categoryId",
          required: false,
          description: "Specify this parameter to filter bookings based on the category of the vehicle they are associated with.",
          type: "number"
        },
        vehicleId: {
          in: "query",
          name: "vehicleId",
          required: false,
          description: "Specify this parameter to filter bookings based on the specific vehicle they are associated with.",
          type: "number"
        },
        bookingStatus: {
          in: "query",
          name: "bookingStatus",
          required: false,
          description: "Specify this parameter to filter bookings based on their status, e.g., Confirmed, Pending or Cancelled.",
          type: "string"
        },
        seatStatus:{
          in: "query",
          name:"seatStatus",
          required: false,
          description:"pecify this parameter to filter seats based on their status, e.g., Available,Booked, or Reserved",
          type:"string"
        }

      },
      content: {

        success: {
          type: 'boolean',
          description: 'Indicates if the request was successful or not.',
        },
        message: {
          type: 'string',
          description: 'A message related to the response',
        },
        statusCode: {
          type: 'integer',
          description: 'The status code of the response.',
        },
        count: {
          type: 'integer',
          description: 'Count of documents',
        },
        data: {
          type: 'array',
          description: 'An array containing the retrieved data.',
          example: [{}, {}]
        }

      }

    },
    info: {
      title: `Api ${appName} Documentation`,
      version: "1.0.0",
    },
    paths: docsSources,
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${hostUrl}/swagger.json`,
        name: `${environment} Server`,
      },
    ],
  },
};

export { optionsSwaggerUI, swaggerSpec };
