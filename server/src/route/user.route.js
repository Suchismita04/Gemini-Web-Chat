import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const userRouter= Router()

userRouter.post('/user/register',registerUser)

export { userRouter}