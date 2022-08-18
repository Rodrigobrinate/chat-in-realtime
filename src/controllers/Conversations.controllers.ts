import ConversationServices from "../services/Conversation.service";
//import { Request, Response } from "express";
import Conversation from "../interfaces/Conversation.interface";
const conversationServices = new ConversationServices();
export default class ConversationController {
  //userServices: UserServices;

  constructor() {}
  //this.userServices = new UserServices();






  async getMyConversations(req: any, res: any) {
    try {
      const response = await conversationServices.getMyConversations(
        req.body.user.id
      ) as Conversation[];

      return res.status(200).json({ conversations: response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "não foi possivel listar as conversas" , error: error})
    }
  }


  async create (req: any, res: any) {
    const {  toId } = req.body;
    
    try {
     
      const response = await conversationServices.create(
        parseInt(req.body.user.id),
        parseInt(toId)
      ) as Conversation;

      return res.status(200).json({ conversation: response });
   
    } catch (error) {
      const response = await conversationServices.create(
        parseInt(req.body.user.id),
        parseInt(toId)
      ) as Conversation;

      //console.log(response);
      return res
        .status(500)
        .json({ message: "não foi possivel criar a conversa" , error: error})
    }
  }



async getOneVerify(req: any, res: any) {
  const {  toId } = req.body;
  try {
    const response = await conversationServices.getOneVerify(
      parseInt(req.body.user.id),
      parseInt(toId)
    ) as Conversation;

    return res.status(200).json({ conversation: response });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "não foi possivel encontrar a conversa" , error: error})
  }
}


async visualization(req: any, res: any) {
      const {  conversation } = req.body; 

  try {
    const response = await conversationServices.visualization(
      parseInt(req.body.user.id),
      parseInt(conversation.id)
    ) as Conversation;

    return res.status(200).json({ conversation: response });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "não foi possivel encontrar a conversa" , error: error})
  }
}
}
