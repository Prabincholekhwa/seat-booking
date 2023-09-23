import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { UserService } from "../services";
import { successResponseData, errorResponseData } from "../utils";
import redisClient from "../config/redisClients"

export class UserController {
    constructor() { }
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const data = await new UserService().create(req.body);
            return successResponseData({
                data,
                message: "User is created successfully.",
                statusCode: HttpStatusEnum.CREATED,
                res,
            });
        }
        catch (err) {
            return errorResponseData({
                message: `${err}`,
                res,
            })
        }
    }

    static async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const userExist = await new UserService().findByPk(Number(req.authData.user.id));
            if (userExist && userExist.isVerified === false) {
                const cacheData = await redisClient.get(`${"otp"+userExist.email}`);
                if (cacheData && cacheData === req.body.otpCode) {
                    const data = await new UserService().updateIsVerifiedByEmail(Number(req.authData.user.id),userExist.email, true);
                    return successResponseData({
                        res,
                        statusCode: HttpStatusEnum.OK,
                        message: "Your account verified successfully"
                    })
                }
                if (cacheData && cacheData !== req.body.otpCode) {
                    return errorResponseData({
                        res,
                        message: "Invalid OTP. Please try again",
                        statusCode: HttpStatusEnum.UNAUTHORIZED
                    })
                }
                return errorResponseData({
                    res,
                    message: "Expired OTP. Request New Otp",
                    statusCode: HttpStatusEnum.UNAUTHORIZED
                })
            }
            if (userExist && userExist.isVerified === true) {
                return errorResponseData({
                    res,
                    message: "Email Already Verified",
                    statusCode: HttpStatusEnum.ALREADY_VERIFIED
                });
            }
            if (!userExist) {
                return errorResponseData({
                    res,
                    message: "User does not exist",
                    statusCode: HttpStatusEnum.NOT_FOUND
                });
            }
        }
        catch (err) {
            return errorResponseData({
                message: `${err}`,
                res
            })
        }

    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const userData = await new UserService().login(req.body);
            return successResponseData(
                {
                    message: "Successful Login",
                    res,
                    data: userData
                }
            )
        }
        catch (err) {
            return errorResponseData({
                message: `${err}`,
                res
            })
        }
    }


}

