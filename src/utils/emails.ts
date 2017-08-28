import * as nodemailer from "nodemailer";
var smtpTransport = require('nodemailer-smtp-transport');

export class Emailer {
    transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport(smtpTransport({
            host: 'Gmail',
            auth: {
                user: 'Ignacio Pastor',
                pass: 'maybepagano'
            }
        }));
        this.verifyMail();
    }

    // Check the status of the connection with the email
    private verifyMail(){
        this.transporter.verify(function(error, success) {
            if (error) {
                console.error(error);
            } else {
                console.log('Connection with email provider running!');
            }
        });
    }

    public async sendEmail(toMail,body, subject?) {
        try {
        return await this.transporter.sendMail({to: toMail,from: '"Home Task" <ignacio.past@gmail.com>',text: body, subject: subject ? subject : "Home Task App"});

        }
        catch(error) {
            console.dir(error);
        }
        
    }
}

export const emailer: Emailer = new Emailer();