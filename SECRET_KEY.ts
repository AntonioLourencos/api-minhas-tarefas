import crypto from "crypto";

const SECRET = crypto.randomBytes(64).toString("hex");
console.log(SECRET);
