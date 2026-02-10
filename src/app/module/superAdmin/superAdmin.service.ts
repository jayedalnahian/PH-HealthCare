import status from "http-status"
import AppError from "../../errorHalpers/AppError"
import { prisma } from "../../lib/prisma"
import { IUpdatesuperAdmin } from "./superAdmin.types"


const getAllSuperAdmins = async () => {
    const superAdmins = prisma.superAdmin.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            address: true,
            gender: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: true
        }
    })


    if (!superAdmins) {
        throw new AppError(status.NOT_FOUND, "No superAdmin found")
    }

    return superAdmins
}


const getSingleSuperAdmin = async (adminId: string) => {
    const admindata = await prisma.admin.findUnique({
        where: {
            id: adminId,
            isDeleted: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            address: true,
            gender: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: true
        }
    })

    return admindata
}


const updateSuperAdmin = async (superAdminId: string, payload: IUpdatesuperAdmin) => {
    const superAdminData = await prisma.superAdmin.findFirst({
        where: {
            id: superAdminId,
            isDeleted: false
        },
        select: {
            id: true,
            userId: true
        }
    })


    if (!superAdminData) {
        throw new AppError(status.NOT_FOUND, "Admin not found")
    }




    const [user, superAdmin] = await prisma.$transaction([
        prisma.user.update({
            where: {
                id: superAdminData.userId
            },
            data: {
                name: payload.name,
                email: payload.email,
                image: payload.profilePhoto
            }
        }),
        prisma.superAdmin.update({
            where: {
                id: superAdminId
            },
            data: payload

        })
    ])

    return { superAdmin, user }
}


const deleteSuperAdmin = async (superAdminId: string) => {


    const superAdmin = await prisma.superAdmin.findFirst({
        where: {
            id: superAdminId,
            isDeleted: false
        }
    })


    if (!superAdmin) {
        throw new AppError(status.NOT_FOUND, "superAdmin not found")
    }
    const result = await prisma.superAdmin.update({
        where: {
            id: superAdminId
        },
        data: {
            isDeleted: true,
            deletedAt: new Date()
        }
    })

    return result;
}


export const SuperAdminService = {
    getAllSuperAdmins,
    getSingleSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin
}