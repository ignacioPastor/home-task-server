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
const userBackend_1 = require("./../backends/userBackend");
const express_1 = require("express");
const fs = require("fs");
const path = require('path');
const bcrypt = require("bcrypt");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body.id;
            let result = yield userBackend_1.userBackend.getUser(data);
            res.json(result);
        });
    }
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let password = req.body.password;
            password = bcrypt.hashSync(password, 10);
            let resultUpdate = yield userBackend_1.userBackend.updateUserByEmail({ password }, email);
            let result;
            if (resultUpdate == 1) {
                result = { ok: true };
            }
            else {
                result = { ok: false, error: 'Error updating the password' };
            }
            res.json(result);
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body.user;
            try {
                let user = yield userBackend_1.userBackend.createUser(data);
                delete user.password;
                res.json({ ok: true, user });
            }
            catch (err) {
                res.json({ ok: false, error: err });
            }
        });
    }
    removeUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.userId;
                if (id) {
                    let rows = yield userBackend_1.userBackend.removeUser(id);
                    if (rows == 1) {
                        res.json({ ok: true });
                    }
                    else {
                        res.json({ ok: false, error: 'Something has failed removing the account' });
                    }
                }
                else {
                    // res.status(400).end('ID required');
                    res.json({ ok: false, error: 'ID required' });
                }
            }
            catch (error) {
                // res.status(500).end('Unexpected server error');
                res.json({ ok: false, error: 'Unexpected server error' });
            }
        });
    }
    init() {
        this.router.post('/getUser', this.getUser);
        this.router.post('/remove', this.removeUser);
        this.router.post('/create', this.createUser);
        this.router.post('/updatepassword', this.updatePassword);
    }
}
exports.UserRoutes = UserRoutes;
const userRoutes = new UserRoutes();
userRoutes.init();
exports.default = userRoutes.router;
