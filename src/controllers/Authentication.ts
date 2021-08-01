import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AlreadyExists } from "@errors/Authentication";
import { DefaultError, MissingArguments } from "@errors/GlobalRequest";
import User from "src/models/User";
import IBody from "@interfaces/IBody";

const AuthenticationController = {
  async SignUp(req: Request, res: Response) {
    const { username, email, password } = req.body as IBody;

    email.toLowerCase();

    if (!(username || email || password)) {
      return res.status(400).send({ message: MissingArguments });
    }

    try {
      const Repository = getRepository(User);

      const CheckUser = await Repository.findOne({ email });

      if (CheckUser !== undefined) {
        return res.status(409).send({ message: AlreadyExists });
      }

      const user = await Repository.create({
        email,
        username,
        password,
        createAt: new Date(),
      });

      await Repository.save(user);

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: DefaultError });
    }
  },
};

export default AuthenticationController;
