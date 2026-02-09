import { Router } from "express";
import { SpecialityRouter } from "../app/module/speciality/speciality.route";
import { AuthRouter } from "../app/module/auth/auth.route";
import { UserRouter } from "../app/module/user/user.route";
import { DoctorRouter } from "../app/module/doctor/doctor.route";

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





export const IndexRouter = router;