"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./../environment");
const cls = require("continuation-local-storage");
const fs = require("fs");
const path = require("path");
const SequelizeStatic = require("sequelize");
class Database {
    constructor() {
        this._basename = path.basename(module.filename);
        SequelizeStatic.cls = cls.createNamespace("sequelize-transaction");
        this._sequelize = new SequelizeStatic(environment_1.Environment.dbName, environment_1.Environment.dbUser, environment_1.Environment.dbPass, environment_1.Environment.dbConfig);
        this._models = {};
        fs.readdirSync(__dirname).filter(file => file !== this._basename).forEach(file => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[model.name] = model;
        });
        Object.keys(this._models).forEach((modelName) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
        this._sequelize.sync({ force: environment_1.Environment.forceWipe }).then(result => {
            if (environment_1.Environment.forceWipe) {
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
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
