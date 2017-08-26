

export class Environment {

    static port: number = 3005;
    static isStaging: boolean = Boolean(process.env.staging); // Original line doesn't include the Boolean constructor


    static forceWipe: boolean = false;
    static dbName: string = process.env.POSTGRES_DB;
    static dbPass: string = process.env.POSTGRES_PASSWORD;
    static dbUser: string = 'postgres';
    static dbConfig: any = {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        timezone: 'Europe/Dublin',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    };
}