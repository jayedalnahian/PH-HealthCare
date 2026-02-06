import { Router } from "express";
import { SpecialityRouter } from "../app/module/speciality/speciality.route";
import { AuthRouter } from "../app/module/auth/auth.route";

const router = Router()


router.use(
    "/specialities",
    SpecialityRouter
)

router.use(
    "/auth",
    AuthRouter
)





export const IndexRouter = router;