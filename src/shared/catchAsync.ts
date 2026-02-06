import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "./sendResponse";
export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.log(error);
            sendResponse(res, {
                httpStatusCode: 500,
                success: false,
                message: "Server Error",
                data: null,
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }
}