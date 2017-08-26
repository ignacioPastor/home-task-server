import { Router, Request, Response, NextFunction } from 'express';

export class Test1 {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public async hello(req: Request, res: Response, next: NextFunction) {
        res.json({message: 'Hello world'});
    }

    init() {
        this.router.get('/', this.hello);
    }
}

const test = new Test1();
test.init();

export default test.router;