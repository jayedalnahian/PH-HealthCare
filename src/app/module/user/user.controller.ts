import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync"
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import status from "http-status";



const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createDoctor(payload)
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Doctor created successfully",
        data: result,
        error: null
    })
})

const createAdmin  = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createAdmin(payload)
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Admin created successfully",
        data: result,
        error: null
    })
})
const createSuperAdmin  = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createSuperAdmin(payload)
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Super Admin created successfully",
        data: result,
        error: null
    })
})
















export const UserController = { createSuperAdmin, createDoctor, createAdmin }