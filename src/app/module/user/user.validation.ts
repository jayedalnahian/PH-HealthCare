import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("password is required").min(6, "password must be at lease 6 characters").max(20, "password must be at most 20 characters"),

    doctor: z.object({
        name: z.string("name is required").min(1, "name must be single character").max(100, "name must be under 100 characters"),
        email: z.email("invalid email address"),
        profilePhoto: z.url("Invalid URL format").optional(),
        contactNumber: z.string("contact number is required").min(11, "contact number must be at least 11 characters").max(14, "contact number must be at most 14 characters").optional(),
        address: z.string("address is required").min(1, "address must be single character").max(200, "address must be under 200 characters").optional(),
        registrationNumber: z.string("registration number is required"),
        experience: z.int("experience is required").nonnegative("experience must be a non-negative integer").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], "gender must be either MALE, FEMALE, or OTHER"),
        appointmentFee: z.number("appointment fee is required").nonnegative("appointment fee must be a non-negative number"),
        qualification: z.string("qualification is required").min(1, "qualification must be single character").max(200, "qualification must be under 200 characters"),
        currentWorkingPlace: z.string("current working place is required").min(1, "current working place must be single character").max(200, "current working place must be under 200 characters"),
        designation: z.string("designation is required").min(1, "designation must be single character").max(200, "designation must be under 200 characters"),

    }),
    specialties: z.array(z.uuid("each specialty must be a valid UUID"), "specialties must be an array of UUIDs").min(1, "at least one specialty is required")
})



export const createAdminZodSchema = z.object({
    password: z.string("password is required").min(6, "password must be at lease 6 characters").max(20, "password must be at most 20 characters"),
    admin: z.object({
        name: z.string("name is required").min(1, "name must be single character").max(100, "name must be under 100 characters"),
        email: z.email("invalid email address"),
        profilePhoto: z.url("Invalid URL format").optional(),
        contactNumber: z.string("contact number is required").min(11, "contact number must be at least 11 characters").max(14, "contact number must be at most 14 characters").optional(),
        address: z.string("address is required").min(1, "address must be single character").max(200, "address must be under 200 characters").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], "gender must be either MALE, FEMALE, or OTHER"),
    })
})

export const createSuperAdminZodSchema = z.object({
    password: z.string("password is required").min(12, "password must be at lease 12 characters").max(30, "password must be at most 30 characters"),
    superAdmin: z.object({
        name: z.string("name is required").min(1, "name must be single character").max(100, "name must be under 100 characters"),
        email: z.email("invalid email address"),
        profilePhoto: z.url("Invalid URL format").optional(),
        contactNumber: z.string("contact number is required").min(11, "contact number must be at least 11 characters").max(14, "contact number must be at most 14 characters").optional(),
        address: z.string("address is required").min(1, "address must be single character").max(200, "address must be under 200 characters").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], "gender must be either MALE, FEMALE, or OTHER"),
    })
})


