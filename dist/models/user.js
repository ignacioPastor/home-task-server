"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let users = sequelize.define('User', {
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
exports.default = default_1;
