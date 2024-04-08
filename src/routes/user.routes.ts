import * as express from "express";
import {authentication, authorization} from "../middlewares/auth.middleware";
import {UserController} from "../controllers/user.controller";
import {AuthController} from "../controllers/auth.controller";

const router = express.Router();

router.get(
    '/get-all',
    authentication,
    authorization(['user', 'admin']),
    UserController.getUsers
)

router.post(
    '/signup',
    UserController.signup
)

router.post(
    '/login',
    AuthController.login
)

export { router as userRouter };