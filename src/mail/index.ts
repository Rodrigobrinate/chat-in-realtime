import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
const hbs = require('nodemailer-express-handlebars')

            export default class index {
             transporter:any
            constructor() {
             //   console.log(process.env)
                 this.transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                      user: process.env.EMAIL, // generated ethereal user
                      pass: process.env.PASSWORD, // generated ethereal password
                    },
                    
                  });
                }


                async sendMail(email: string, title: string, data:any): Promise<any> {
                    const filePath = path.join(__dirname, `../../src/mail/views/${title}.html`);
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    const template = handlebars.compile(source);
                    const replacements = {
                        username: process.env.EMAIL,
                    };
                    const htmlToSend = template(replacements);

                    const handlebarOptions = {
                        viewEngine: {
                            partialsDir: path.resolve(__dirname, `../../../src/mail/views/`),
                            defaultLayout: false,
                        },
                        viewPath: path.resolve(__dirname, `../../../src/mail/views/`),
                    };

                    this.transporter.use('compile', hbs(handlebarOptions))

                    try {

                    return await this.transporter.sendMail({
                        from: process.env.EMAIL, // sender address
                        to: email, // list of receivers
                        subject: title, // Subject line
                        html : htmlToSend,
                        template: 'email',
                        context:  data,

                      }).then((info: any) => {
                        return info;
                        }).catch((err: any)=> {
                            return err;
                        })
                    } catch (error) {
                       
                            return error ;
                        }
                    }
            }