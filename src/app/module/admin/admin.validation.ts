import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateAdminPayload = z.object({
    name: z.string("name is required").min(1, "name must be single character").max(100, "name must be under 100 characters").optional(),
    email: z.email("invalid email address").optional(),
    profilePhoto: z.url("Invalid URL format").optional().optional(),
    contactNumber: z.string("contact number is required").min(11, "contact number must be at least 11 characters").max(14, "contact number must be at most 14 characters").optional(),
    address: z.string("address is required").min(1, "address must be single character").max(200, "address must be under 200 characters").optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], "gender must be either MALE, FEMALE, or OTHER").optional(),
})