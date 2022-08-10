"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { Router, Request, Response } from 'express';
//import ExpressAdapter from '../../adapter/ExpressAdapter';
//import UserController from '../../controller/UserController';
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const Message_routes_1 = __importDefault(require("./routes/Message.routes"));
const Conversation_routes_1 = __importDefault(require("./routes/Conversation.routes"));
const Message_service_1 = __importDefault(require("./services/Message.service"));
const messageServices = new Message_service_1.default();
//import MessageController from '../controllers/Message.controller';
const app = (0, express_1.default)();
var http = require('http');
const Koa = require('koa');
const socket = require('socket.io');
const koa = new Koa();
const server = http.createServer(koa.callback());
const io = socket(server, { cors: { origin: '*', credentials: true } });
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
io.on('connection', (socket) => {
    //console.log('a user connected');
    socket.on("select_room", (data) => {
        socket.join(data.room);
        console.log('selectromm:', data);
    });
    socket.on('new', async function (data) {
        console.log('data2', data);
        setTimeout(async () => {
            const response = await messageServices.getByConversation(parseInt(data.conversationId), data.page);
            io.to(data.conversationId).emit("message", { room: data.room, message: data, data: response });
        }, 500);
    });
    /*   console.log('a user connected');
         socket.on('create', function(data: any) {
           socket.join(data.room);
           console.log('data1', data);
       });
       socket.on('new',async function(data: any) {
         socket.join(data.room);
         console.log('data2', data);
         
            const response = await messageServices.getMessage(parseInt(data.room)) as Message[];
            io.to(data.room).emit("message", { room: data.room, message: response, data:data  });
   */
});
app.use("/user/", User_routes_1.default);
app.use("/message/", Message_routes_1.default);
app.use("/conversation/", Conversation_routes_1.default);
app.listen(3001, () => 'server running on port 3000');
server.listen(3002, 'localhost', () => 'server running on port 3000');
module.exports = app;
