import Express from "express";
import Cors from "cors";
import RoutesPublic from "./routes/Public";
import connectMongo from "./services/database";

const APP = Express();
const PORT = process.env.PORT!;

connectMongo();
APP.use(Express.json());
APP.use(Express.urlencoded({ extended: true }));
APP.use(Cors());

APP.use("/api", RoutesPublic);

APP.listen(PORT, () =>
  console.log(`Server listen in http://localhost:${PORT}/api`)
);
