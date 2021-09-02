import { Router } from 'express';
import AuthenticationController from '@controllers/Authentication';

const PublicRoutes = Router();

PublicRoutes.post('/signUp', AuthenticationController.SignUp);
PublicRoutes.post('/signIn', AuthenticationController.SignIn);
PublicRoutes.post('/recoverAccount/:email?', AuthenticationController.RecoverAccount);
PublicRoutes.post('/resetAccountPassword/:token?', AuthenticationController.ResetAccountPassword);

export default PublicRoutes;
