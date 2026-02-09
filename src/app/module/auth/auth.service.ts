import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHalpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { LoginUserPayload, RegisterPatientPayload } from "./auth.types";
import { tokenUtils } from "../../utils/token";




const registerPatient = async (payload: RegisterPatientPayload) => {
    const { name, email, password } = payload

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        }
    })

    if (!data.user) {
        throw new AppError(status.BAD_REQUEST, "Failed to register patient")
    }



    try {
        const patient = await prisma.$transaction(
            async (tx) => {
                const patientTX = await tx.patient.create({
                    data: {
                        userId: data.user.id,
                        name: payload.name,
                        email: payload.email,
                    }
                })

                return patientTX
            }


        )
        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            name: data.user.name,
            role: data.user.role,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })

        const refreshToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            name: data.user.name,
            role: data.user.role,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })
        return {
            ...data,
            accessToken,
            refreshToken,
            patient
        }
    } catch (error) {
        console.log("Transaction error: ", error);
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })

        throw error;
    }

}






const loginUser = async (payload: LoginUserPayload) => {
    const { email, password } = payload
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new AppError(status.FORBIDDEN, "User is blocked")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new AppError(status.NOT_FOUND, "User is softly deleted")
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        name: data.user.name,
        role: data.user.role,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })

    const refreshToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        name: data.user.name,
        role: data.user.role,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })

    return {
        ...data,
        accessToken,
        refreshToken
    }
}

export const AuthService = { registerPatient, loginUser }