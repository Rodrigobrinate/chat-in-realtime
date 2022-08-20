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
const Conversation_service_1 = __importDefault(require("./services/Conversation.service"));
const messageServices = new Message_service_1.default();
const conversationServices = new Conversation_service_1.default();
//import MessageController from '../controllers/Message.controller';
const app = (0, express_1.default)();
var http = require('http');
const Koa = require('koa');
const Socket = require('socket.io');
const server = http.createServer(app);
//const koa = new Koa();
//const server = http.createServer(koa.callback());
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        // or with an array of origins
        // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
        //credentials: true
    }
});
//const io = Socket({server, cors: {  origin: '*',  credentials: true }});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
const path = require('path');
console.log(path.join(__dirname, '../../src/public'));
app.use('/static', express_1.default.static(path.join(__dirname, '../../src/public')));
io.on('connection', (socket) => {
    //  console.log('a user connected');
    socket.on("select_room", (data) => {
        socket.join(data.room);
        // console.log('selectromm:', data);
    });
    socket.on('new', async function (data) {
        console.log('data2', data);
        //const numberofnewmessages = await conversationServices.getNewMessages(data.toId * 1 , data.conversationId.id || data.conversationId);
        //const lastMessage = await messageServices.getLastMessage( data.conversationId.id || data.conversationId);
        io.to(data.conversationId).emit("newMessage", { room: data.room, });
        setTimeout(async () => {
            try {
                const response = await messageServices.getByConversation(parseInt(data.conversationId.id || data.conversationId), data.page);
                io.to(data.conversationId).emit("message", { room: data.room, message: data, data: response, teste: 'teste' });
            }
            catch (error) {
                console.log(error);
            }
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
server.listen(process.env.PORT || 3001, () => 'server running on port 3000');
//server.listen(process.env.PORT || 3002, 'localhost', () => 'server running on port 3000')
module.exports = app;
