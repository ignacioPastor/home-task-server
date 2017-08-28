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
const emails_1 = require("../utils/emails");
const bcrypt = require("bcrypt");
const environment_1 = require("../environment");
class SettingUtils {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    sendCodeCheckEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.userEmail;
            // checkMail available
            let userAlreadyRegisteredWithThatEmail = yield userBackend_1.userBackend.getByEmail(email);
            if (userAlreadyRegisteredWithThatEmail) {
                res.json({ ok: false, error: "This email already exist" });
            }
            else {
                try {
                    let myCacheKey = yield sendCode(email);
                    res.json({ ok: true, identifyKey: myCacheKey });
                }
                catch (error) {
                    res.status(500).end('Unexpected server error');
                }
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            let email = req.body.email;
            password = bcrypt.hashSync(password, 10);
            let result = yield userBackend_1.userBackend.updateUser({ email, password });
            if (result == 1)
                res.json({ ok: true });
            else
                res.json({ ok: false, error: 'Unexpected error' });
        });
    }
    checkCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let code = req.body.code;
                let identifyKey = req.body.identifyKey;
                if (code) {
                    let storedCode = environment_1.Environment.getCache(identifyKey);
                    if (storedCode == code) {
                        res.json({ ok: true });
                    }
                    else {
                        res.json({ ok: false, error: "The code is not correct" });
                    }
                }
                else {
                    res.status(400).end('Code required');
                }
            }
            catch (error) {
                res.status(500).end('Unexpected server error');
            }
        });
    }
    init() {
        this.router.post('/sendcode', this.sendCodeCheckEmail);
    }
}
exports.SettingUtils = SettingUtils;
function sendCode(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let myCode = generateKey(8);
        let myCacheKey = generateKey(20);
        yield emails_1.emailer.sendEmail(email, 'Your code is: ' + myCode, "Town Apps email change");
        environment_1.Environment.setCache(myCacheKey, myCode);
        return myCacheKey;
    });
}
// Generate key random with lowercase, uppercase and numbers
function generateKey(lengthDesired) {
    var characters = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ2346789";
    var key = "";
    for (let i = 0; i < lengthDesired; i++)
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    return key;
}
const settingUtilsRoutes = new SettingUtils();
settingUtilsRoutes.init();
exports.default = settingUtilsRoutes.router;
