import { config } from "dotenv";
config();

const {
  DATABSE_TYPE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

module.exports = {
  type: DATABSE_TYPE,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/services/migrations/*.ts"],
  cli: {
    migrations: ["./src/services/migrations"],
  },
};
