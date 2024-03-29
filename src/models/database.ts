import { Environment } from './../environment';
import * as cls from "continuation-local-storage";
import * as fs from "fs";
import * as path from "path";
import * as SequelizeStatic from "sequelize";
import { UserAttributes, UserInstance } from "./user";
import { Sequelize } from "sequelize";

export interface SequelizeModels {
    User: SequelizeStatic.Model<UserInstance, UserAttributes>;
}


class Database {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);

        (SequelizeStatic as any).cls = cls.createNamespace("sequelize-transaction");
        this._sequelize = new SequelizeStatic(Environment.dbName, Environment.dbUser,
            Environment.dbPass, Environment.dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter(file => file !== this._basename).forEach(file => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });

        this._sequelize.sync({force: Environment.forceWipe}).then(result => {
            if(Environment.forceWipe){
                this._models.User.create({
                    "userName": "name3",
                    "email": "3",
                    "password": "33"
                });
            }

        });
    }
    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
