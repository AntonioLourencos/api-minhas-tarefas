import AuthenticationController from "src/controllers/Authentication";
import { Router } from "express";

const RoutesPublic = Router();

RoutesPublic.post("/signUp", AuthenticationController.SignUp);
RoutesPublic.post("/recoverPassword", AuthenticationController.RecoverPassword);

export default RoutesPublic;
