import { UserAttributes } from './user';
import { Instance } from "sequelize";
import * as SequelizeStatic from "sequelize";
import { DataTypes, Sequelize } from "sequelize";

export interface UserAttributes {
    id?: number;
    userName?: string;
    email?: string;
    password?: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes;
}

export default function (sequelize: Sequelize, dataTypes: DataTypes):
SequelizeStatic.Model<UserInstance, UserAttributes> {
let users = sequelize.define<UserInstance, UserAttributes>('User', {
        email: {
            type: dataTypes.STRING(200),
            unique: true,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING(200),
            unique: true,
            allowNull: false
        }
    }, {
            timestamps: true
        });

return users;
}