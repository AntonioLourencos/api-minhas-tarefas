import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AlreadyExists, NotFound } from "@errors/Authentication";
import { DefaultError, MissingArguments } from "@errors/GlobalRequest";
import { NotSend } from "@errors/Services";
import User from "src/models/User";
import IBody from "@interfaces/IBody";
import Transporter from "src/services/mail";

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
      return res.status(400).send({ message: DefaultError });
    }
  },
  async RecoverPassword(req: Request, res: Response) {
    const { email } = req.body as IBody;

    email.toLowerCase();

    if (!email) {
      return res.status(400).send({ message: MissingArguments });
    }
    try {
      const Repository = getRepository(User);
      const user = await Repository.findOne({ where: { email } });

      if (user === undefined) {
        return res.status(404).send({ message: NotFound });
      }

      const config = {
        to: email.toString(),
        subject: "Minhas tarefas - Recuperação de conta",
        template: "/auth/forgot_password",
      };

      await Transporter.sendMail(config, (error) => {
        if (error) {
          return res.status(400).send({ message: NotSend });
        }
      });

      return res.sendStatus(204);
    } catch (error) {
      return res.status(400).send({ message: DefaultError });
    }
  },
};

export default AuthenticationController;
