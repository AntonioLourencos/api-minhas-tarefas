import Express from "express";
import Cors from "cors";
import RoutesPublic from "./routes/Public";
import "reflect-metadata";
import "./services/database";

const APP = Express();
const PORT = process.env.PORT!;

APP.use(Express.json());
APP.use(Cors());

APP.use("/api", RoutesPublic);

APP.listen(PORT, () =>
  console.log(`Server listen in http://localhost:${PORT}/api`)
);
