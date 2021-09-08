import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import extend from 'extend';
import { NotFound } from '@utils/messages/errors/Authentication';
import { DefaultError, MissingArguments } from '@utils/messages/errors/GlobalRequest';
import { NotContent, ErrorOnSave, DeleteInvalidId, InvalidState } from '@utils/messages/errors/ToDo';
import User from '@models/User';
import Todo from '@models/ToDo';
import IBody from '@utils/interfaces/IBody';
import IQuery from '@utils/interfaces/IQuery';
import checkUUID from '@utils/helpers/checkUUID';
import { fileURLToPath } from 'url';

const TodoController = {
    async New(req: Request, res: Response) {
        const { userID }: IQuery = req.query;
        const { title, description, priority, state, startedAt, finishAt } = req.body as IBody;

        if (!(userID || title)) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            const user = await User.findOne({ _id: userID });

            if (!user) {
                return res.status(404).send({ message: NotFound });
            }

            if (!['fazer', 'fazendo', 'feito'].includes(state)) {
                return res.status(404).send({ message: InvalidState });
            }

            const todo = await new Todo({
                _id: uuid(),
                createdBy: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                },
                title,
                state,
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

            const FilterTarefas = {
                fazer: todo.filter((tarefa) => tarefa.state.includes('fazer')),
                fazendo: todo.filter((tarefa) => tarefa.state.includes('fazendo')),
                feito: todo.filter((tarefa) => tarefa.state.includes('feito')),
            };

            return res.status(200).send({ ...FilterTarefas });
        } catch (error) {
            return res.status(400).send({ message: DefaultError });
        }
    },
    async FindOne(req: Request, res: Response) {
        const { id }: IQuery = req.query;

        if (!id) {
            return res.status(400).send({ message: MissingArguments });
        }

        if (id!.constructor !== String) {
            return res.status(400).send({ message: DefaultError });
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
        const { id }: IQuery = req.query;

        if (!id) {
            return res.status(400).send({ message: MissingArguments });
        }

        try {
            if (typeof id === 'string') {
                if (checkUUID(id)) {
                    const todo = await Todo.findOneAndDelete({ _id: id });
                    if (!todo) {
                        throw "can't delete";
                    }
                } else {
                    throw 'invalid id';
                }
            }

            if (typeof id === 'object') {
                for (const _id of id) {
                    if (checkUUID(_id)) {
                        const todo = await Todo.findOneAndDelete({ _id });
                        if (!todo) {
                            throw "can't delete";
                        }
                    } else {
                        throw 'invalid id';
                    }
                }
            }

            return res.sendStatus(204);
        } catch (error) {
            if (error === "can't delete") {
                return res.status(400).send({ message: NotContent });
            }

            if (error === 'invalid id') {
                return res.status(400).send({ message: DeleteInvalidId });
            }

            return res.status(400).send({ message: DefaultError });
        }
    },
    async editOne(req: Request, res: Response) {
        const { id }: IQuery = req.query;

        if (!(id || req.body)) {
            return res.status(400).send({ message: MissingArguments });
        }

        if (id!.constructor !== String) {
            return res.status(400).send({ message: DefaultError });
        }

        try {
            let todo = await Todo.findOne({ _id: id }).select(['-createdBy', '-createAt', '-__v']);

            if (!todo) {
                return res.status(404).send({ message: NotContent });
            }

            if (req.body.state && !['fazer', 'fazendo', 'feito'].includes(req.body.state)) {
                return res.status(404).send({ message: InvalidState });
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
