
import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateReauest } from "../../../middleware/validateRequest";
import { updateDoctorValidationSchema } from "./doctor.validation";
const router = Router()



router.get("/", checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR),  DoctorController.getAllDoctors)

router.get("/:doctorId", checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR), DoctorController.getSingleDoctor)

router.delete('/:id', DoctorController.deleteDoctor)

router.patch('/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR), validateReauest(updateDoctorValidationSchema), DoctorController.updateDoctor)





export const DoctorRouter = router