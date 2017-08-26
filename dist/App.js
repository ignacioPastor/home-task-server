"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./routes/test");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
// Creates and configures an ExpressJS web server.
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.express.use('/', test_1.default);
        this.express.use('/api/test', test_1.default);
    }
}
exports.default = new App().express;
