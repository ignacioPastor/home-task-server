import Test1 from './routes/test';
import User from './routes/user';
import Auth from './routes/auth';
import SettingUtils from './routes/setting-utils';

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

// Creates and configures an ExpressJS web server.
class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/', Test1);
        this.express.use('/api/test', Test1);
        this.express.use('/api/user', User);
        this.express.use('/api/auth', Auth);
        this.express.use('/api/setting-utils', SettingUtils)
        

    }

}

export default new App().express;