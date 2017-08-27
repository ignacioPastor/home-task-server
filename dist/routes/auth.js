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
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            let user = yield userBackend_1.userBackend.signIn(email, password);
            res.json(user);
        });
    }
    init() {
        this.router.post('/signin', this.signIn);
    }
}
exports.AuthRouter = AuthRouter;
const authRoutes = new AuthRouter();
authRoutes.init();
exports.default = authRoutes.router;
