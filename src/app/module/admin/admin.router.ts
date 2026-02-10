import { Router } from "express";
import { SuperAdminController } from "./admin.controller";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../../middleware/checkAuth";
import { validateReauest } from "../../../middleware/validateRequest";
import { updateAdminPayload } from "./admin.validation";

const router = Router()


router.get("/",checkAuth(Role.SUPER_ADMIN), SuperAdminController.getAllAdmins)
router.get("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), SuperAdminController.getSingleAdmin)
router.patch("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateReauest(updateAdminPayload), SuperAdminController.updateAdmin)
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), SuperAdminController.deleteAdmin)



export const AdminRoute = router