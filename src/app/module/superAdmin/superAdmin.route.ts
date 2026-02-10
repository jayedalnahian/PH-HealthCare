import { Router } from "express";

import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../../middleware/checkAuth";
import { validateReauest } from "../../../middleware/validateRequest";
import { SuperAdminController } from "./superAdmin.controller";
import { updateSuperAdminPayload } from "./superAdmin.validation";

const router = Router()


router.get("/", checkAuth(Role.SUPER_ADMIN), SuperAdminController.getAllSuperAdmins)
router.get("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), SuperAdminController.getSingleSuperAdmin)
router.patch("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateReauest(updateSuperAdminPayload), SuperAdminController.updateSuperAdmin)
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), SuperAdminController.deleteSuperAdmin)



export const SuperAdminRoute = router