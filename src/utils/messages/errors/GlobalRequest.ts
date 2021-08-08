import IError from "@interfaces/IError";

export const DefaultError: IError = {
  service: "Global",
  type: "Check your request",
  message: "Your request unfurtunally we can't resolve, try again",
};

export const MissingArguments: IError = {
  service: "Global",
  type: "Check your request",
  message: "Missing arguments",
};
