import { Router } from "express";
import { SpecialityRouter } from "../app/module/speciality/speciality.router";
import { AuthRouter } from "../app/module/auth/auth.router";
import { UserRouter } from "../app/module/user/user.router";
import { DoctorRouter } from "../app/module/doctor/doctor.router";
import { AdminRoute } from "../app/module/admin/admin.router";
import { SuperAdminRoute } from "../app/module/superAdmin/superAdmin.route";

const router = Router()


router.use(
    "/specialities",
    SpecialityRouter
)

router.use(
    "/auth",
    AuthRouter
)


router.use(
    "/users",
    UserRouter
)


router.use(
    "/doctor",
    DoctorRouter
)



router.use(
    "/admin",
    AdminRoute
)

router.use(
    "/super-admin",
    SuperAdminRoute
)





export const IndexRouter = router;