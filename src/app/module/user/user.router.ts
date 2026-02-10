import { Router } from "express";
import { UserController } from "./user.controller";
import { validateReauest } from "../../../middleware/validateRequest";
import { createAdminZodSchema, createDoctorZodSchema, createSuperAdminZodSchema } from "./user.validation";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create-doctor", checkAuth(Role.SUPER_ADMIN), validateReauest(createDoctorZodSchema), UserController.createDoctor)

router.post("/create-admin", checkAuth(Role.SUPER_ADMIN), validateReauest(createAdminZodSchema), UserController.createAdmin)

router.post("/create-super-admin", checkAuth(Role.SUPER_ADMIN), validateReauest(createSuperAdminZodSchema), UserController.createSuperAdmin)




export const UserRouter = router