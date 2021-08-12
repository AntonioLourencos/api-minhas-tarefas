import { Schema, model } from "mongoose";
import IUser from "../utils/interfaces/models/IUsers";
import bcrypt from "bcrypt";

const UserShema: Schema<IUser> = new Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  resetToken: {
    type: String,
    select: false,
  },
  expireToken: {
    type: Date,
    select: false,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now(),
    select: false,
  },
});

UserShema.pre("save", async function (next) {
  if (!this.password) {
    next();
  }
  const hash = await bcrypt.hash(this?.password!, 8);
  this.password = hash;
  next();
});

export default model<IUser>("Profiles", UserShema);
