import AuthenticationController from "../controllers/Authentication";
import { Router } from "express";

const RoutesPublic = Router();

RoutesPublic.post("/signUp", AuthenticationController.SignUp);
RoutesPublic.post("/signIn", AuthenticationController.SignIn);
RoutesPublic.post("/recoverPassword", AuthenticationController.RecoverPassword);

export default RoutesPublic;
