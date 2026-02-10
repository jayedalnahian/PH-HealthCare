import status from "http-status"
import AppError from "../../errorHalpers/AppError"
import { prisma } from "../../lib/prisma"
import { IUpdateAdmin } from "./admin.types"


const getAllAdmins = async () => {
    const admins = prisma.admin.findMany({
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


    if (!admins) {
        throw new AppError(status.NOT_FOUND, "No admin found")
    }

    return admins
}


const getSingleAdmin = async (adminId: string) => {
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


const updateAdmin = async (adminId: string, payload: IUpdateAdmin) => {
    const adminData = await prisma.admin.findFirst({
        where: {
            id: adminId,
            isDeleted: false
        },
        select: {
            id: true,
            userId: true
        }
    })


    if (!adminData) {
        throw new AppError(status.NOT_FOUND, "Admin not found")
    }




    const [user, admin] = await prisma.$transaction([
        prisma.user.update({
            where: {
                id: adminData.userId
            },
            data: {
                name: payload.name,
                email: payload.email,
                image: payload.profilePhoto
            }
        }),
        prisma.admin.update({
            where: {
                id: adminId
            },
            data: payload

        })
    ])

    return { admin, user }
}


const deleteAdmin = async (adminId: string) => {


    const admin = await prisma.admin.findFirst({
        where: {
            id: adminId,
            isDeleted: false
        }
    })


    if (!admin) {
        throw new AppError(status.NOT_FOUND, "Admin not found")
    }
    const result = await prisma.admin.update({
        where: {
            id: adminId
        },
        data: {
            isDeleted: true,
            deletedAt: new Date()
        }
    })

    return result;
}


export const SuperAdminService = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}