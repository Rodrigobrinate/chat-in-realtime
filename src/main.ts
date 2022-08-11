import express from 'express'
//import { Router, Request, Response } from 'express';
//import ExpressAdapter from '../../adapter/ExpressAdapter';
//import UserController from '../../controller/UserController';
import userRouter from './routes/User.routes';
import messageRouter from './routes/Message.routes';
import conversationRouter from './routes/Conversation.routes';
import MessageServices from './services/Message.service';
const messageServices = new MessageServices();
//import MessageController from '../controllers/Message.controller';
const app = express();
var http = require('http');
const Koa = require('koa');
const socket = require('socket.io');


const koa = new Koa();
const server = http.createServer(koa.callback());
const io = socket({server:app, cors: {  origin: '*',  credentials: true }});

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

import cors from 'cors';
import Message from './interfaces/Message.interface';
app.use(cors());

app.use(express.json());


io.on('connection', (socket : any) => {

    console.log('a user connected');
  
  socket.on("select_room", (data: any) => {
    socket.join(data.room);
  console.log('selectromm:', data);

  });
  socket.on('new',  async function(data: any) {
    console.log('data2', data);
    setTimeout(async () => {
      const response = await messageServices.getByConversation(parseInt(data.conversationId), data.page) as Message[];
      io.to(data.conversationId).emit("message", { room: data.room, message: data,  data:response  })
    }, 500);
       
       
  })

  



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
})



  app.use("/user/", userRouter);
  app.use("/message/",messageRouter);
   app.use("/conversation/", conversationRouter);





   



  app.listen(process.env.PORT || 3001, () => 'server running on port 3000')
  server.listen(process.env.WPORT || 3002, 'localhost', () => 'server running on port 3000')


  module.exports = app;