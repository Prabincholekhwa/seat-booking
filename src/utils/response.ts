import { Response } from "express";
import { HttpStatusEnum } from "../enums";

/**
 * This function formats success response.
 *
 * @param {Object} data
 */
const successResponseData = ({
  data,
  message = "",
  res,
  count,
  statusCode = HttpStatusEnum.OK,
}: {
  data?: Object | Object[] | null;
  message?: string;
  count?: number;
  res: Response;
  statusCode?: HttpStatusEnum;
}) => {
  res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    count,
    ...(data && { data }),
  });
};

const errorResponseData = ({
  message = "An error occurred.",
  res,
  statusCode = HttpStatusEnum.INTERNAL_SERVER_ERROR,
}: {
  message?: string;
  res: Response;
  statusCode?: HttpStatusEnum;
  errorDetails?: Object | null;
}) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export { successResponseData, errorResponseData };
