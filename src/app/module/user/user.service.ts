import status from "http-status";
import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateAdmin, IcreateDoctorPayload, ICreateSuperAdmin } from "./user.types";
import AppError from "../../errorHalpers/AppError";

const createDoctor = async (payload: IcreateDoctorPayload) => {
    const specialties: Specialty[] = []

    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })

        if (!specialty) {
            throw new AppError(status.BAD_REQUEST, `Specialty with id ${specialtyId} not found.`)
        }
        specialties.push(specialty)
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email
        }
    })

    if (userExists) {
        throw new AppError(status.FORBIDDEN, "User with this email already exists.")
    }


    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            name: payload.doctor.name,
            password: payload.password,
            role: Role.DOCTOR,
            needPasswordChange: true,
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor
                }
            })

            const doctorSpecialtyData = specialties.map((specialties) => {
                return {
                    doctorId: doctorData.id,
                    specialtyId: specialties.id
                }
            })

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    isDeleted: true,
                    deletedAt: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor;
        })
        return result;

    } catch (error) {
        console.log("Transaction error: ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }


        })

        throw error;
    }
}


const createAdmin = async (payload: ICreateAdmin) => {

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.admin.email
        }
    })

    if (userExists) {
        throw new AppError(status.FORBIDDEN, "User with this email already exists.")
    }


    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.admin.email,
            name: payload.admin.name,
            password: payload.password,
            role: Role.ADMIN,
            needPasswordChange: true,
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const adminData = await tx.admin.create({
                data: {
                    userId: userData.user.id,
                    ...payload.admin
                }
            })


            const admin = await tx.admin.findUnique({
                where: {
                    id: adminData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    isDeleted: true,
                    deletedAt: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                }
            })

            return admin;
        })
        return result;

    } catch (error) {
        console.log("Transaction error: ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }


        })

        throw error;
    }
}


const createSuperAdmin = async (payload: ICreateSuperAdmin) => {

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.superAdmin.email
        }
    })

    if (userExists) {
        throw new AppError(status.FORBIDDEN, "User with this email already exists.")
    }


    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.superAdmin.email,
            name: payload.superAdmin.name,
            password: payload.password,
            role: Role.ADMIN,
            needPasswordChange: true,
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const superAdminData = await tx.superAdmin.create({
                data: {
                    userId: userData.user.id,
                    ...payload.superAdmin
                }
            })


            const superAdmin = await tx.superAdmin.findUnique({
                where: {
                    id: superAdminData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    gender: true,
                    isDeleted: true,
                    deletedAt: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                }
            })

            return superAdmin;
        })
        return result;

    } catch (error) {
        console.log("Transaction error: ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }


        })

        throw error;
    }
}





export const UserService = { createSuperAdmin, createAdmin,createDoctor }