import { Request, Response } from "express";
import { specialityService } from "./speciality.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import status from "http-status";



const createSpeciality = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await specialityService.createSpeciality(payload)
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Speciality created successfully",
        data: result,
        error: null
    })
})



const getAllSpeciality = catchAsync(async (req: Request, res: Response) => {
    const result = await specialityService.getAllSpeciality()
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Specialties fetched successfully.",
        data: result,
        error: null
    })
})





const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
    const specialityId = req.params.id as string
    const result = await specialityService.deleteSpeciality(specialityId)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "speciality deleted successfully",
        data: result,
        error: null
    })
})




const updateSpeciality = catchAsync(async (req: Request, res: Response) => {
    const specialityId = req.params.id as string
    const payload = req.body
    const result = await specialityService.updateSpeciality(specialityId, payload)
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "speciality updated successfully",
        data: result,
        error: null
    })
})




export const specialityController = { updateSpeciality, createSpeciality, getAllSpeciality, deleteSpeciality }