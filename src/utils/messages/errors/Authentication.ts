import IError from "@interfaces/IError";

export const AlreadyExists: IError = {
  service: "Authentication",
  type: "Validate",
  message: "User already exists",
  generateError: new Date().toUTCString().slice(0, 25),
};

export const NotFound: IError = {
  service: "Authentication",
  type: "Validate",
  message: "User not exists yet",
  generateError: new Date().toUTCString().slice(0, 25),
};
