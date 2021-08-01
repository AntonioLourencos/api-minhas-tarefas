import { createConnection } from "typeorm";

createConnection()
  .then(() => console.log("Conection with database started."))
  .catch((err) => console.log(err));
