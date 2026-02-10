import { Request, Response } from "express"
import { catchAsync } from "../../../shared/catchAsync"
import { DoctorService } from "./doctor.service"
import { sendResponse } from "../../../shared/sendResponse"
import status from "http-status"
import { IUpdateDoctor } from './doctor.type';


const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorService.getAllDoctors()
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctors fetched successfully.",
        data: result,
        error: null
    })
})



const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await DoctorService.getSingleDoctor(id as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor data fetched successfully.",
        data: result,
        error: null
    })
})


const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id: doctorId } = req.params
    const result = await DoctorService.deleteDoctor(doctorId as string)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor softly deleted successfully.",
        data: result,
        error: null
    })
})


const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body
    const result = await DoctorService.updateDoctor(id as string, payload)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor updated successfully.",
        data: result,
        error: null
    })
})



export const DoctorController = {
    updateDoctor,
    getAllDoctors,
    getSingleDoctor,
    deleteDoctor
}