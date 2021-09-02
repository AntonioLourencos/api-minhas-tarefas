import { validate, version } from 'uuid';

function checkUUID(value: string) {
    return validate(value) && version(value) === 4;
}

export default checkUUID;
