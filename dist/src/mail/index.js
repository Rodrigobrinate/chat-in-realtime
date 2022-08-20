"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars = __importStar(require("handlebars"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const hbs = require('nodemailer-express-handlebars');
class index {
    constructor() {
        //   console.log(process.env)
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, // generated ethereal password
            },
        });
    }
    async sendMail(email, title, data) {
        const filePath = path.join(__dirname, `../../../src/mail/views/${title}.html`);
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
        this.transporter.use('compile', hbs(handlebarOptions));
        try {
            return await this.transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: title,
                html: htmlToSend,
                template: 'email',
                context: data,
            }).then((info) => {
                return info;
            }).catch((err) => {
                return err;
            });
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = index;
