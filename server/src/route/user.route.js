import { Router } from "express";
import { logInUser, registerUser } from "../controller/user.controller.js";

const userRouter= Router()

userRouter.post('/user/register',registerUser)
userRouter.post('/user/logIn',logInUser)

export { userRouter}