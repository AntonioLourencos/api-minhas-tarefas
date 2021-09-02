import { Router } from 'express';
import MiddleAuth from '@/middlewares/authenticacion';
import TodoController from '@/controllers/Todo';
const PrivateRoutes = Router();

PrivateRoutes.use(MiddleAuth);

PrivateRoutes.post('/new/:userID?', TodoController.New);

PrivateRoutes.get('/find/:userID?', TodoController.Find);
PrivateRoutes.get('/findOne/:userID?/:id?', TodoController.FindOne);

PrivateRoutes.put('/editOne/:userID?/:id?', TodoController.editOne);

PrivateRoutes.delete('/delete/:userID?/:id?', TodoController.Delete);

export default PrivateRoutes;
