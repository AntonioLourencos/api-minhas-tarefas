import Express from "express";
import Cors from "cors";
import PublicRoutes from "./routes/Public";
import PrivateRoutes from "./routes/Private";
import connectMongo from "./services/database";

const APP = Express();
const PORT = process.env.PORT!;

connectMongo();
APP.use(Express.json());
APP.use(Express.urlencoded({ extended: true }));
APP.use(Cors());

APP.use("/api", PublicRoutes);
APP.use("/api/todo", PrivateRoutes);

APP.listen(PORT, () =>
    console.log(`Server listen in http://localhost:${PORT}/api`)
);
