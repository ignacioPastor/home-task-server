

export class Environment {

    static port: number = 3005;
    static isStaging: boolean = Boolean(process.env.staging); // Original line doesn't include the Boolean constructor

}