import { userBackend } from './../backends/userBackend';
import { UserInstance, UserAttributes } from './../models/user';
import { Router, Request, Response, NextFunction } from 'express';
import { models, sequelize } from "../models/database";
import { emailer } from "../utils/emails";
import * as bcrypt from "bcrypt";
import { Environment } from "../environment";


export class SettingUtils {
    router: Router
    constructor() {
        this.router = Router();
        this.init();
    }

    public async sendCodeCheckEmail(req: Request, res: Response, next: NextFunction) {
        let email = req.body.userEmail;
        let checkEmailExistInDatabase = req.body.checkEmailExistInDatabase;

        if (checkEmailExistInDatabase) {
            // Check the received email exists in the database
            let userAlreadyRegisteredWithThatEmail = await userBackend.getByEmail(email);

            if (!userAlreadyRegisteredWithThatEmail) {
                res.json({ ok: false, error: "This email doesn't exist in our database" });
            }
        } else {
            try {
                let myCacheKey = await sendCode(email);
                res.json({ ok: true, identifyKey: myCacheKey });
            } catch (error) {
                res.status(500).end('Unexpected server error');
            }
        }
    }

    public async checkCode(req: Request, res: Response, next: NextFunction) {
        try {
            let code = req.body.code;
            let identifyKey = req.body.identifyKey;

            if (code) {
                let storedCode = Environment.getCache(identifyKey);

                if (storedCode == code) {
                    res.json({ ok: true });
                } else {
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
    }

    public async storeCache(req: Request, res: Response, next: NextFunction) {
        try {
            Environment.setCache('mykeytest', 'storedContent');
            res.json({ ok: true });
        } catch (err) {
            console.error(err);
            res.json({ ok: false, error: err });
        }
    }

    public async getCache(req: Request, res: Response, next: NextFunction) {
        try {
            let myContentStoredInCache = await Environment.getCache('mykeytest');
            res.json({ ok: true, content: myContentStoredInCache });
        } catch (err) {
            console.error(err);
            res.json({ ok: false, error: err });
        }
    }

    init() {
        this.router.post('/sendcode', this.sendCodeCheckEmail);
        this.router.get('/storecache', this.storeCache);
        this.router.get('/getcache', this.getCache);
        this.router.post('/checkcode', this.checkCode);
    }

}


async function sendCode(email) {
    let myCode = generateKey(8);
    let myCacheKey = generateKey(20);

    await emailer.sendEmail(email, 'Your code is: ' + myCode, "Home Task App");

    Environment.setCache(myCacheKey, myCode);
    return myCacheKey;
}

// Generate key random with lowercase, uppercase and numbers
function generateKey(lengthDesired): string {

    var characters = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ2346789";
    var key = "";
    for (let i = 0; i < lengthDesired; i++) key += characters.charAt(Math.floor(Math.random() * characters.length));
    return key;
}

const settingUtilsRoutes = new SettingUtils();
settingUtilsRoutes.init();

export default settingUtilsRoutes.router;