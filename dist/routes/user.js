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
    init() {
        this.router.post('/getUser', this.getUser);
    }
}
exports.UserRoutes = UserRoutes;
const userRoutes = new UserRoutes();
userRoutes.init();
exports.default = userRoutes.router;
