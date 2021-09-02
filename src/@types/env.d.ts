declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        NODE_ENV: string;
        SECRET_KEY: string;
        URL_MONGO: string;
        STMP_HOST: string;
        STMP_PORT: number;
        STMP_EMAIL: string;
        STMP_PASS: string;
        STMP_SECURE: boolean;
    }
}
