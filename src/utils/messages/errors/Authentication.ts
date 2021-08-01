import IError from "@interfaces/IError";

export const AlreadyExists: IError = {
  service: "Authentication",
  type: "Validate",
  message: "User already exists",
  generateError: new Date().toUTCString().slice(0, 25),
};
