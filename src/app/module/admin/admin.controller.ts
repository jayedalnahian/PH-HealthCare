import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { SuperAdminService } from "./admin.service";
import { sendResponse } from "../../../shared/sendResponse";
import status from "http-status/cloudflare";

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await SuperAdminService.getAllAdmins()
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admins fetched successfully.",
        data: result,
        error: null
    })
});


const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SuperAdminService.getSingleAdmin(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin data fetched successfully.",
        data: result,
        error: null
    })
});


const updateAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body
    
    const result = await SuperAdminService.updateAdmin(id as string, payload)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin data updated successfully.",
        data: result,
        error: null
    })
});


const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    
    const result = await SuperAdminService.deleteAdmin(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin soft deleted successfully.",
        data: result,
        error: null
    })
});




export const SuperAdminController = { deleteAdmin, updateAdmin, getAllAdmins, getSingleAdmin }