"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../models/database");
const bcrypt = require("bcrypt");
class UserBackend {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield database_1.models.User.findOne({ where: { id: id } });
            return user;
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.getByEmail(email, true);
            if (user && bcrypt.compareSync(password, user.password)) {
                return { ok: true, user };
            }
            else {
                return { ok: false };
            }
        });
    }
    getByEmail(email, keepPass) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield database_1.models.User.findOne({ where: { email: email } });
            if (user) {
                if (!keepPass)
                    delete user.dataValues.password;
                return user.dataValues;
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = bcrypt.hashSync(user.password, 10);
            let newUser = yield database_1.models.User.create(user);
            return newUser.dataValues;
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield database_1.models.User.destroy({ where: { id: id } });
            return rows;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedUser = yield database_1.models.User.update(user, { where: { email: user.email } });
            return updatedUser[0];
        });
    }
    updateUserById(data, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedUser = yield database_1.models.User.update(data, { where: { id: userID } });
            return updatedUser[0];
        });
    }
}
exports.userBackend = new UserBackend();
