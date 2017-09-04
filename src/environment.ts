
var Cache = require('cache-storage');
var FileStorage = require('cache-storage/Storage/FileSyncStorage');
var mkdirp = require('mkdirp');

mkdirp('./temp');
var cache = new Cache(new FileStorage('./temp'), 'cache_storage_express');


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

    static MAIL_SUPPORT = "ignacio.past@gmail.com";


    static setCache(key: string, value: string, timeToExpire: number = 30){
        try{
            cache.save(key, value, {
                expire: {minutes: timeToExpire}
            });
        } catch(err){
            console.error(err);
        }
    
    }


    // Return the value to received key
    // If deleteOnceRetreived is True the key-value is deleted once is retreived
    static getCache(key: string, deleteOnceRetreived: boolean = true): string{
        
        let myKey;
        try {
            myKey = cache.load(key);
        } catch(err){
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