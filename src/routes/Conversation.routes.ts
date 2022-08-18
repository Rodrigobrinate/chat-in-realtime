import express from 'express';
import { Router, Request, Response } from 'express';
import MessageController from '../controllers/Message.controller';
import ConversationController from '../controllers/Conversations.controllers';
import verifyJWT from '../middleware/jwtVerify';
const conversationController = new ConversationController();

const app = express();


const router = Router()
app.use(router)


  

  router.get("/", verifyJWT, conversationController.getMyConversations);
  router.post("/create", verifyJWT, conversationController.create);
  router.post("/getOneVerify", verifyJWT, conversationController.getOneVerify);
  router.post("/visualization", verifyJWT, conversationController.visualization);



export default router;