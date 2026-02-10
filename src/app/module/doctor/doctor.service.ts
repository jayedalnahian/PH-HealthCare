import status from "http-status"
import { Doctor } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import AppError from "../../errorHalpers/AppError"
import { IUpdateDoctor } from "./doctor.type"

const getAllDoctors = async () => {
    const result = await prisma.doctor.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            registrationNumber: true,
            experience: true,
            gender: true,
            appointmentFee: true,
            qualification: true,
            currentWorkingPlace: true,
            designation: true,
            averageRating: true,
            createdAt: true,
            updatedAt: true,
            specialties: {
                select: {
                    specialty: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            },
        },
    })

    const doctors = result.map(doctor => ({
        ...doctor,
        specialties: doctor.specialties.map(s => s.specialty)
    }))

    return doctors
}



const getSingleDoctor = async (doctorId: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id: doctorId,
            isDeleted: false
        },
        include: {
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })


    if (!doctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found")
    }

    const result = {
        ...doctor,
        specialties: doctor.specialties.map(s => s.specialty)
    }


    return result
}



const deleteDoctor = async (doctorId: string): Promise<Doctor> => {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
    });

    if (!doctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    if (doctor.isDeleted) {
        throw new AppError(status.BAD_REQUEST, "Doctor is already deleted");
    }
    const result = await prisma.doctor.update({
        where: {
            id: doctorId
        },
        data: {
            isDeleted: true,
            deletedAt: new Date()
        }
    })

    return result

}



const updateDoctor = async (doctorId: string, payload: IUpdateDoctor) => {
    const existDoctor = await prisma.doctor.findUnique({
        where: {
            id: doctorId
        }
    })

    if (!existDoctor || existDoctor.isDeleted) {
        throw new AppError(status.NOT_FOUND, "doctor not found or softly deleted")
    }

    const { specialties, ...doctorData } = payload

    await prisma.doctor.update({
        where: {
            id: doctorId,
            isDeleted: false
        },
        data: doctorData,
        include: {
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })


    if (specialties && specialties.length > 0) {
        await prisma.doctorSpecialty.deleteMany({
            where: {
                doctorId
            }
        })

        const specialitysData = specialties.map(specialtyId => ({ doctorId, specialtyId }))
        await prisma.doctorSpecialty.createMany({
            data: specialitysData
        })
    }


    const result = await prisma.doctor.findUnique({
        where: { id: doctorId },
        include: {
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });

    return {
        ...result,
        specialties: result?.specialties.map((s) => s.specialty) || [],
    };


}



export const DoctorService = {
    updateDoctor,
    getAllDoctors,
    getSingleDoctor,
    deleteDoctor
}