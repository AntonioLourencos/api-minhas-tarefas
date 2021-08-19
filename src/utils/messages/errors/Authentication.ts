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

export const UserNotRequestChangePassword: IError = {
    service: "Authentication - Change Password",
    type: "Invalid request",
    message: "The user has not requested a password change",
};

export const UserTimeInvalid: IError = {
    service: "Authentication - Change Password",
    type: "Validate",
    message: "The time after the request has expired",
};

export const TokenNotProvided: IError = {
    service: "Authentication",
    type: "Validate",
    message: "Token not provided",
};

export const TokenMalformed: IError = {
    service: "Authentication",
    type: "Validate",
    message: "Malformed token",
};

export const TokenInvalid: IError = {
    service: "Authentication",
    type: "Validate",
    message: "Token invalid",
};
