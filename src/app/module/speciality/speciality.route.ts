import { Router } from "express";
import { specialityController } from "./speciality.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";


const router = Router()


router.post("/", specialityController.createSpeciality)


router.get("/", checkAuth(Role.ADMIN), specialityController.getAllSpeciality)


router.delete("/:id", specialityController.deleteSpeciality)


router.patch("/:id", specialityController.updateSpeciality)


export const SpecialityRouter = router