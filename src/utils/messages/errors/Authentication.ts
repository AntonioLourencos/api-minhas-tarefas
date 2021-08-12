import IError from "../../interfaces/IError";

export const AlreadyExists: IError = {
  service: "Authentication",
  type: "Validate",
  message: "User already exists",
};

export const NotFound: IError = {
  service: "Authentication",
  type: "Validate",
  message: "User not exists yet",
};

export const WrongPassword: IError = {
  service: "Authentication",
  type: "Validate",
  message: "Invalid password, try again",
};
