import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await AuthService.registerPatient(payload)

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            data: result,
            message:"User registerd successfully",
            error: null
        })
    }
)


const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await AuthService.loginUser(payload)

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            data: result,
            message:"User logedin successfully",
            error: null
        })
    }
)


export const AuthController = {
    registerPatient,
    loginUser
}