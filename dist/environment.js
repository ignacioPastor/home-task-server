"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = require('cache-storage');
var FileStorage = require('cache-storage/Storage/FileSyncStorage');
var mkdirp = require('mkdirp');
mkdirp('./temp');
var cache = new Cache(new FileStorage('./temp'), 'cache_storage_express');
class Environment {
    static setCache(key, value, timeToExpire = 30) {
        try {
            cache.save(key, value, {
                expire: { minutes: timeToExpire }
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    // Return the value to received key
    // If deleteOnceRetreived is True the key-value is deleted once is retreived
    static getCache(key, deleteOnceRetreived = true) {
        let myKey;
        try {
            myKey = cache.load(key);
        }
        catch (err) {
            console.error(err);
            myKey = '-1';
        }
        //COMENTED BECAUSE MAKE THE SERVER RESTART, IN PRODUCTION WILL BE FIXED
        // if(deleteOnceRetreived){
        //     cache.remove(key);  // once the key has been used is deleted from storage
        // }
        return myKey;
    }
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
