import express from 'express'
//import { Router, Request, Response } from 'express';
//import ExpressAdapter from '../../adapter/ExpressAdapter';
//import UserController from '../../controller/UserController';
import userRouter from './routes/User.routes';
import messageRouter from './routes/Message.routes';
import conversationRouter from './routes/Conversation.routes';
import MessageServices from './services/Message.service';
import ConversationServices from './services/Conversation.service';
const messageServices = new MessageServices();
const conversationServices = new ConversationServices();
//import MessageController from '../controllers/Message.controller';
const app = express();
var http = require('http');
const Koa = require('koa');
const Socket = require('socket.io');

const server = http.createServer(app);



//const koa = new Koa();
//const server = http.createServer(koa.callback());
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*",
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    //credentials: true
  }
});


//const io = Socket({server, cors: {  origin: '*',  credentials: true }});

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

import cors from 'cors';
import Message from './interfaces/Message.interface';

app.use(cors());
app.use(express.static('public'))
app.use(express.json());

const path = require('path')
console.log(path.join(__dirname, '../../src/public'))
app.use('/static', express.static(path.join(__dirname, '../../src/public')))

io.on('connection', (socket : any) => {

  //  console.log('a user connected');
  
  socket.on("select_room", (data: any) => {
    socket.join(data.room);
 // console.log('selectromm:', data);

  });
  socket.on('new',  async function(data: any) {
    console.log('data2', data);

     //const numberofnewmessages = await conversationServices.getNewMessages(data.toId * 1 , data.conversationId.id || data.conversationId);
     //const lastMessage = await messageServices.getLastMessage( data.conversationId.id || data.conversationId);
     io.to(data.conversationId).emit("newMessage", { room: data.room,   })
     

    setTimeout(async () => { 
      
  try {
      const response = await messageServices.getByConversation(parseInt(data.conversationId.id || data.conversationId ), data.page) as Message[]; 
       io.to(data.conversationId).emit("message", { room: data.room, message: data,  data:response, teste: 'teste'  })
  } catch (error) {
      console.log(error);
  }
    
    
         
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





   



  server.listen(process.env.PORT || 3001, () => 'server running on port 3000')
  //server.listen(process.env.PORT || 3002, 'localhost', () => 'server running on port 3000')


  module.exports = app;