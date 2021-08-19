import { Router } from "express";
import MiddleAuth from "../middlewares/authenticacion";
import TodoController from "../controllers/Todo";
const PrivateRoutes = Router();

PrivateRoutes.use(MiddleAuth);

PrivateRoutes.post("/new/:userID?", TodoController.New);

PrivateRoutes.get("/find/:userID?", TodoController.Find);
PrivateRoutes.get("/findOne/:userID?/:id?", TodoController.FindOne);

PrivateRoutes.put("/edit/:userID?/:id?", (req, res) => res.send("Ok"));
PrivateRoutes.put("/editOne/:userID?/:id?", (req, res) => res.send("Ok"));

PrivateRoutes.delete("/delete/:userID?/:ids?", TodoController.Delete);
PrivateRoutes.delete("/deleteOne/:userID?/:id?", TodoController.DeleteOne);

export default PrivateRoutes;
