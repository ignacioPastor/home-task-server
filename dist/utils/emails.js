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
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const secretKeys_1 = require("./../secretKeys");
class Emailer {
    constructor() {
        this.transporter = nodemailer.createTransport(smtpTransport({
            service: secretKeys_1.default.MAIL_SERVICE,
            auth: {
                user: secretKeys_1.default.MAIL_SENDER,
                pass: secretKeys_1.default.MAIL_PASSWORD
            }
        }));
        this.verifyMail();
    }
    // Check the status of the connection with the email
    verifyMail() {
        this.transporter.verify(function (error, success) {
            if (error) {
                console.error(error);
            }
            else {
                console.log('Connection with email provider running!');
            }
        });
    }
    sendEmail(toMail, body, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.transporter.sendMail({ to: toMail, from: '"Home Task" <ignacio.past@gmail.com>', text: body, subject: subject ? subject : "Home Task App" });
            }
            catch (error) {
                console.dir(error);
            }
        });
    }
}
exports.Emailer = Emailer;
exports.emailer = new Emailer();
