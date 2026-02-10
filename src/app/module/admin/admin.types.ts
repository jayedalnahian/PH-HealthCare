import { Gender } from "../../../generated/prisma/enums";

export interface IUpdateAdmin {
    name?: string;
    email?: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    gender?: Gender
}