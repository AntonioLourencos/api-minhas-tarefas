import AuthenticationController from "../controllers/Authentication";
import { Router } from "express";

const PublicRoutes = Router();

PublicRoutes.post("/signUp", AuthenticationController.SignUp);
PublicRoutes.post("/signIn", AuthenticationController.SignIn);
PublicRoutes.post("/recoverAccount/:email?", AuthenticationController.RecoverAccount);
PublicRoutes.post("/resetAccountPassword/:token?", AuthenticationController.ResetAccountPassword);


export default PublicRoutes;
