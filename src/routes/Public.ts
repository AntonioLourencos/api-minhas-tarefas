import AuthenticationController from "src/controllers/Authentication";
import { Router } from "express";

const RoutesPublic = Router();

RoutesPublic.post("/signIn", AuthenticationController.SignUp);

export default RoutesPublic;
