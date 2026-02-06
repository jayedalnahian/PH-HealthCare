import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { LoginUserPayload, RegisterPatientPayload } from "./auth.types";




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
        throw new Error("Failed to register patient")
    }


    //* TODO: CREATE PATIENT PROFILE IN TRANSACTION AFTER SIGNUP IN USER MODEL
    // const patient = await prisma.$transaction(
    //     async (tx) => {
    //         await tx.
    //     }
    // )


    return data

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
        throw new Error("User is blocked")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is softly deleted")
    }

    return data
}

export const AuthService = { registerPatient, loginUser }