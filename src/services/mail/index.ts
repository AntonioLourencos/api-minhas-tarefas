import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

config();
const { STMP_HOST, STMP_PORT, STMP_SECURE, STMP_EMAIL, STMP_PASS } = process.env;

const Transporter = nodemailer.createTransport({
    host: STMP_HOST,
    port: STMP_PORT,
    secure: STMP_SECURE,
    auth: {
        user: STMP_EMAIL,
        pass: STMP_PASS,
    },
});

Transporter.verify(function (error): void {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

Transporter.use(
    'compile',
    hbs({
        viewEngine: {
            defaultLayout: undefined,
        },
        viewPath: path.resolve('./src/utils/views/mail/'),
        extName: '.hbs',
    })
);

export default Transporter;
