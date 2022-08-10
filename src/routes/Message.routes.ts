import express from 'express';
import { Router, Request, Response } from 'express';
import MessageController from '../controllers/Message.controller';
import verifyJWT from '../middleware/jwtVerify';
const messageController = new MessageController();

const app = express();


const router = Router()
app.use(router)


  

  router.post("/create", verifyJWT, messageController.CreateMessage);
  router.get("/lastmessage/:id", verifyJWT, messageController.getLastMessage);
    router.get("/:id/:page", verifyJWT, messageController.GetMessages);


export default router;