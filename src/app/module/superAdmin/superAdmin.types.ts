import { Gender } from "../../../generated/prisma/enums";

export interface IUpdatesuperAdmin {
    name?: string;
    email?: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    gender?: Gender
}