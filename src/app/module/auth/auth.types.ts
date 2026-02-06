import { Role } from "../../../generated/prisma/enums"

export type RegisterPatientPayload = {
    name: string
    email: string
    password: string
    needsPasswordChange?: boolean
    role?: Role
}


export interface LoginUserPayload {
    email: string;
    password: string;
}