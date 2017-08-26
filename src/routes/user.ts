import { userBackend } from './../backends/userBackend';
import { Environment } from './../environment';
import { Router, Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
const fs = require("fs");
const path = require('path');

export class UserRoutes {
    router: Router
    lastUpdate: moment.Moment;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async getUser(req: Request, res: Response, next: NextFunction){
        let data = req.body.id;

        let result = await userBackend.getUser(data);
        res.json(result);
    }




    init() {
        this.router.post('/getUser', this.getUser);
    }
}

const userRoutes = new UserRoutes();
userRoutes.init();

export default userRoutes.router;