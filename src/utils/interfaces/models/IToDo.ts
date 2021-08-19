import { Document } from "mongoose";

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
    StartedAt?: Date;
    FinishAt?: Date | string;
    createAt?: Date;
}
