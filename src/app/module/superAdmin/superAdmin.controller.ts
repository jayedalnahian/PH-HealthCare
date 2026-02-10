import { Request, Response } from "express";
import status from "http-status/cloudflare";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { SuperAdminService } from "./superAdmin.service";

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await SuperAdminService.getAllSuperAdmins()
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admins fetched successfully.",
        data: result,
        error: null
    })
});


const getSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await SuperAdminService.getSingleSuperAdmin(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin data fetched successfully.",
        data: result,
        error: null
    })
});


const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body

    const result = await SuperAdminService.updateSuperAdmin(id as string, payload)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin data updated successfully.",
        data: result,
        error: null
    })
});


const deleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await SuperAdminService.deleteSuperAdmin(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin soft deleted successfully.",
        data: result,
        error: null
    })
});




export const SuperAdminController = { deleteSuperAdmin, updateSuperAdmin, getAllSuperAdmins, getSingleSuperAdmin }