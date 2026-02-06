import { Speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Speciality): Promise<Speciality> => {

    const speciality = await prisma.speciality.create({
        data: payload
    })
    return speciality
}


const getAllSpeciality = async (): Promise<Speciality[]> => {
    const specialitys = await prisma.speciality.findMany()
    return specialitys
}


const deleteSpeciality = async (specialityId: string): Promise<Speciality> => {
    const result = await prisma.speciality.delete({
        where: {
            id: specialityId
        }
    })

    return result
}




const updateSpeciality = async (specialityId: string, payload: Partial<Speciality>): Promise<Speciality> => {
    const result = await prisma.speciality.update({
        where: {
            id: specialityId
        },
        data: payload
    })

    return result
}


export const specialityService = { updateSpeciality, createSpeciality, getAllSpeciality, deleteSpeciality }