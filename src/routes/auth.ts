import { userBackend } from './../backends/userBackend';
import { UserInstance, UserAttributes } from './../models/user';
import { Router, Request, Response, NextFunction } from 'express';
import { models, sequelize } from "../models/database";
import * as bcrypt from "bcrypt";

export class AuthRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        let { email, password } = req.body;

        let user = await userBackend.signIn(email, password);
        res.json(user);
    }

    init() {
        this.router.post('/signin', this.signIn);
    }

}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;