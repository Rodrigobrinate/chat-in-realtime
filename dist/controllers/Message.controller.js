"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../services/User.service"));
const Message_service_1 = __importDefault(require("../services/Message.service"));
const Conversation_service_1 = __importDefault(require("../services/Conversation.service"));
const Koa = require('koa');
const socket = require('socket.io');
const http = require('http');
const koa = new Koa();
const server = http.createServer(koa.callback());
const io = socket(server, { cors: { origin: '*', credentials: true } });
const jwt = require("jsonwebtoken");
const userServices = new User_service_1.default();
const messageServices = new Message_service_1.default();
const conversationServices = new Conversation_service_1.default();
class UserController {
    //userServices: UserServices;
    constructor() { }
    //this.userServices = new UserServices();
    async CreateMessage(req, res) {
        const { text, userId } = req.body;
        const Mayconversation = await conversationServices.getOneVerify(req.body.user.id, parseInt(userId));
        if (!Mayconversation) {
            if (!text || !userId) {
                return res.status(400).json({ message: "Missing fields" });
            }
            else {
                /* try {
                   const response = (await conversationServices.create(
                     parseInt(req.body.user.id),
                     parseInt(userId)
                   )) as Conversation;
         
         
                 
                    
                 
                  
         
         
                   if (response && response.id) {
                     const message = {
                       text: text,
                       toId: parseInt(req.body.user.id),
                       fromId: parseInt(userId),
                       conversationId: response.id,
                     } as Message;
                     await messageServices.create(message);
                   }
         
                   return res.status(200).json({ message: response });
                 } catch (error) {
                   return res
                     .status(500)
                     .json({ message: "não foi possivel enviar mensagem" });
                 }*/
            }
        }
        else {
            // try {
            const message = {
                text: text,
                toId: parseInt(req.body.user.id),
                fromId: parseInt(userId),
                conversationId: Mayconversation.id,
            };
            const response = await messageServices.create(message);
            return res.status(200).json({ message: response });
            // } catch (error) {
            //   return res
            //     .status(500)
            //     .json({ message: "não foi possivel enviar mensagem" });
            //  }
        }
    }
    async GetMessages(req, res) {
        const { id, page } = req.params;
        // console.log("teste", req.body.user.id, id);
        if (!id) {
            return res.status(400).json({ message: "Missing fields" });
        }
        else {
            try {
                const response = await messageServices.getMessage(parseInt(id), parseInt(page));
                return res.status(200).json({ messages: response });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "não foi possivel enviar mensagem" });
            }
        }
    }
}
exports.default = UserController;
