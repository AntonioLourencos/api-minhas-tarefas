import JWT from "jsonwebtoken";
import { config } from "dotenv";

function generateToken(params = {}) {
  config();

  const { SECRET_KEY } = process.env;

  return JWT.sign(params, SECRET_KEY!, {
    algorithm: "HS256",
  });
}

export default generateToken;
