import IError from '../../interfaces/IError';

export const NotContent: IError = {
    service: 'ToDo',
    type: 'Search',
    message: 'Content not found',
};

export const ErrorOnSave: IError = {
    service: 'ToDo',
    type: 'Save',
    message: "We can't save your modifications",
};
