import AuthenticationController from "../controllers/Authentication";
import { Router } from "express";

const PublicRoutes = Router();

PublicRoutes.post("/signUp", AuthenticationController.SignUp);
PublicRoutes.post("/signIn", AuthenticationController.SignIn);
PublicRoutes.post("/recoverAccount", AuthenticationController.RecoverAccount);
PublicRoutes.post("/resetAccountPassword", AuthenticationController.ResetAccountPassword);


export default PublicRoutes;
