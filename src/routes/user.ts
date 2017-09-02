import { userBackend } from './../backends/userBackend';
import { Environment } from './../environment';
import { Router, Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
const fs = require("fs");
const path = require('path');
import * as bcrypt from "bcrypt";

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

    public async updatePassword(req: Request, res: Response, next: NextFunction){
        let email = req.body.email;
        let password = req.body.password;

        password = bcrypt.hashSync(password, 10);

        let resultUpdate = await userBackend.updateUserByEmail({ password }, email);

        let result;
        if(resultUpdate == 1){
            result = { ok: true };
        } else {
            result = { ok: false, error: 'Error updating the password' };
        }
        res.json(result);
    }

    public async createUser(req: Request, res: Response, next: NextFunction){
        let data = req.body.user;

        try {
            let user = await userBackend.createUser(data);
            delete user.password;
            res.json({ ok: true, user });
        } catch(err){
            res.json({ ok: false, error: err });
        }
    }

    public async removeUser(req: Request, res: Response, next: NextFunction){
        try {
            let id = req.body.userId;
            if (id) {
                let rows = await userBackend.removeUser(id);
                if (rows == 1 ) {
                    res.json({ ok: true });
                } else {
                    res.json({ ok: false, error: 'Something has failed removing the account'});
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
    }

    init() {
        this.router.post('/getUser', this.getUser);
        this.router.post('/remove', this.removeUser);
        this.router.post('/create', this.createUser);
        this.router.post('/updatepassword', this.updatePassword);
    }
}

const userRoutes = new UserRoutes();
userRoutes.init();

export default userRoutes.router;