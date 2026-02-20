import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { UserService } from "../services/user.service";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

export default userRouter;
export {userRouter as Router};