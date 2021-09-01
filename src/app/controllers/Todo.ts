import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import extend from 'extend';
import { NotFound } from '@/utils/messages/errors/Authentication';
import { DefaultError, MissingArguments } from '@/utils/messages/errors/GlobalRequest';
import { NotContent, ErrorOnSave } from '@/utils/messages/errors/ToDo';
import User from '@/models/User';
import Todo from '@/models/ToDo';
import IBody from '@/utils/interfaces/IBody';
import IQuery from '@/utils/interfaces/IQuery';

const TodoController = {
    async New(req: Request, res: Response) {
        const { userID }: IQuery = req.query;
        const { title, description, priority, startedAt, finishAt } = req.body as IBody;

        if (!(userID || title)) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            const user = await User.findOne({ _id: userID });

            if (!user) {
                return res.status(404).send({ message: NotFound });
            }

            const todo = await new Todo({
                _id: uuid(),
                createdBy: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                },
                title,
                description,
                priority,
                startedAt,
                finishAt,
                createAt: new Date(),
            });

            await todo.save();

            todo.createdBy = undefined;
            todo.createAt = undefined;
            user.__v = undefined;

            return res.status(200).send({ todo });
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async Find(req: Request, res: Response) {
        const { userID }: IQuery = req.query;

        if (!userID) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            const todo = await Todo.find({
                'createdBy._id': userID,
            }).select(['-createdBy', '-createAt', '-__v']);

            if (!todo) {
                return res.status(404).send({ message: NotContent });
            }

            return res.status(200).send({ todo });
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async FindOne(req: Request, res: Response) {
        const { id }: IQuery = req.query;

        if (!id) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            const todo = await Todo.findOne({
                _id: id,
            }).select(['-createdBy', '-createAt', '-__v']);

            if (!todo) {
                return res.status(404).send({ message: NotContent });
            }

            return res.status(200).send({ todo });
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async Delete(req: Request, res: Response) {
        const { ids }: IQuery = req.query;

        if (!ids) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            ids.forEach(async (_id: string) => {
                await Todo.deleteMany({ _id });
            });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async DeleteOne(req: Request, res: Response) {
        const { id }: IQuery = req.query;

        if (!id) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            await Todo.deleteOne({ _id: id });

            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async editOne(req: Request, res: Response) {
        const { id }: IQuery = req.query;

        if (!(id || req.body)) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            let todo = await Todo.findOne({ _id: id }).select(['-createdBy', '-createAt', '-__v']);

            if (!todo) {
                return res.status(404).send({ message: NotContent });
            }

            todo = extend(todo, req.body);

            todo?.save(function (err, updatedtodo) {
                if (err) {
                    return res.status(400).send({ message: ErrorOnSave });
                }

                return res.status(200).send({ updatedtodo });
            });
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
};

export default TodoController;
