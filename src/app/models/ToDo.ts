import { Schema, model } from 'mongoose';
import IToDo from '@utils/interfaces/models/IToDo';

const ToDoShema: Schema<IToDo> = new Schema({
    _id: {
        type: String,
        required: true,
    },
    createdBy: {
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
            required: true,
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'Not have description yet',
    },
    priority: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
    },
    StartedAt: {
        type: Date,
        default: Date.now(),
    },
    FinishAt: {
        type: Date || String,
        default: 'Not have a finish date',
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now(),
        select: false,
    },
});

export default model<IToDo>('ToDo', ToDoShema);
