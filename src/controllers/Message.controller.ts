import MessageServices from "../services/Message.service";
import { Request, Response } from "express";
import Message from "../interfaces/Message.interface";
const messageServices = new MessageServices();
export default class UserController {
  constructor() {}

  async CreateMessage(req: any, res: Response) {
    const { text, userId, conversationId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({ message: "preencha todos os campos" });
    } else {
      try {
        const message = {
          text: text,
          toId: parseInt(req.body.user.id),
          fromId: parseInt(userId),
          conversationId: parseInt(conversationId),
        } as Message;
        const response = await messageServices.create(message);
        return res.status(200).json({ message: response });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel enviar mensagem" });
      }
    }
  }


  async getLastMessage(req:any, res: any){
    const {id } = req.params;
        try{
            const response = await messageServices.getLastMessage(parseInt(id))
            return res.status(200).json({ message: response });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel enviar mensagem" });
        }
 }



  async GetMessages(req: Request, res: Response) {
    const { id, page } = req.params;
    if (!id) {
      return res.status(400).json({ message: "preencha todos os campos" });
    } else {
      try {
        const response = await messageServices.getByConversation(
          parseInt(id),
          parseInt(page)
        );
        return res.status(200).json({ messages: response });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel enviar mensagem" });
      }
    }
  }
}
