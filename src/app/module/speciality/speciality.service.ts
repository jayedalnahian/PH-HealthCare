
import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Specialty): Promise<Specialty> => {

    const speciality = await prisma.specialty.create({
        data: payload
    })
    return speciality
}


const getAllSpeciality = async (): Promise<Specialty[]> => {
    const specialitys = await prisma.specialty.findMany()
    return specialitys
}


const deleteSpeciality = async (specialityId: string): Promise<Specialty> => {
    const result = await prisma.specialty.delete({
        where: {
            id: specialityId
        }
    })

    return result
}




const updateSpeciality = async (specialityId: string, payload: Partial<Specialty>): Promise<Specialty> => {
    const result = await prisma.specialty.update({
        where: {
            id: specialityId
        },
        data: payload
    })

    return result
}


export const specialityService = { updateSpeciality, createSpeciality, getAllSpeciality, deleteSpeciality }