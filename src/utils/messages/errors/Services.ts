import IError from "@interfaces/IError";

export const NotSend: IError = {
  service: "Mailer",
  type: "Send",
  message: "we can't send the email, try again",
  generateError: new Date().toUTCString().slice(0, 25),
};
