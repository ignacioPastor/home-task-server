"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
}
Environment.port = 3005;
Environment.isStaging = Boolean(process.env.staging); // Original line doesn't include the Boolean constructor
Environment.forceWipe = false;
Environment.dbName = process.env.POSTGRES_DB;
Environment.dbPass = process.env.POSTGRES_PASSWORD;
Environment.dbUser = 'postgres';
Environment.dbConfig = {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    timezone: 'Europe/Dublin',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
exports.Environment = Environment;
