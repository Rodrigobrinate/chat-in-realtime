import { PrismaClient, Users } from "@prisma/client";
import Conversation from "../interfaces/Conversation.interface";
import Message from "../interfaces/Message.interface";
import User from "../interfaces/User.interface";
const util = require("util");

export default class ConversationRepository {
  prisma = new PrismaClient();
  constructor() {}

  async create(user1Id: number,user2Id: number): Promise<Conversation | ErrorConstructor> {
    try {
      return await this.prisma.conversation.create({
        data: {
          user1Id: user1Id,
          user2Id: user2Id * 1,
        },
      });
    } catch (error) {
      throw new Error("não foi possivel cadatrar o usuario" + error);
    }
  }

  





  //// busca tadas conversas do usuario logado iniciada por ele ou não 
  async getOneVerify(
    user1Id: number,
    user2Id: number
  ): Promise<Conversation | any> {
     try {
      return await this.prisma.conversation.findFirst({
        where: {
          OR: [
            {
              user1Id: user1Id,
              user2Id: user2Id,
            },
            {
              user1Id: user2Id,
              user2Id: user1Id,
            },
          ],
        },
      });
    } catch (error) {
      throw new Error("não foi possivel listar as conversas");
    }
  }



  //// busca as conversas do usuario logado
  async getMyConversations(
    userId: number
  ): Promise<Conversation[] | ErrorConstructor> {
    try {
      return await this.prisma.conversation.findMany({
        where: {
          OR: [
            {
              user1Id: userId,
            },
            {
              user2Id: userId * 1,
            },
          ],
          NOT: {
            AND: [
                {user1Id: userId * 1},
                {user2Id: userId * 1},
            ],
          },
        },

        include: {
          user2: {
            select: {
              id: true,
              name: true,
            },
          },
          user1: {
            select: {
              id: true,
              name: true,
            },
          },
        },

    
      });
    } catch (error) {
      throw new Error("não foi possivel listar as conversas");
    }
  }


 async  visualization(userId: number, conversation: number): Promise<Conversation | ErrorConstructor> {
    try {

      const teste = await this.prisma.conversation.findUnique({
        where: {
          id: conversation,
        },
      })

      if (teste?.user1Id === userId) {

       return await this.prisma.conversation.update({
          where: {
            id: conversation,
          },
          data: {
            user1Visualization: new Date(),
          },
        });

      }else{
      return  await this.prisma.conversation.update({
          where: {
            id: conversation,
          },
          data: {
            user2Visualization: new Date(),
          },
        });
      }


     
    } catch (error) {
      throw new Error("não foi possivel listar as conversas");
    }
  

 }



 async getNewMessages(userId: number, conversation: number): Promise<Message[] | ErrorConstructor> {

    try {


      const teste = await this.prisma.conversation.findUnique({
        where: {
          id: conversation,
        },
      })

      if (teste?.user1Id === userId) {
        
       return await this.prisma.message.findMany({
        where: {
          conversationId: conversation,
          createdAt: {
            gt: teste?.user1Visualization,
          },
        },
      });
      }else{

        return await this.prisma.message.findMany({
        where: {
          conversationId: conversation,
          createdAt: {
            gt: teste?.user2Visualization,
          },
        },
      });
      }
    } catch (error) {
      throw new Error("não foi possivel listar as conversas");
    }
  }

}
