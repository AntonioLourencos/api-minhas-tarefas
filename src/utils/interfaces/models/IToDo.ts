import { Document } from 'mongoose';

export default interface IToDo extends Document {
    _id: string;
    createdBy?: {
        _id: string;
        username: string;
        email: string;
    };
    title: string;
    description?: string;
    priority?: number;
    startedAt?: Date;
    finishAt?: Date | string;
    createAt?: Date;
}
