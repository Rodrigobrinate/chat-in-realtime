import { PrismaClient, Users } from "@prisma/client";
import Message from "../interfaces/Message.interface";
import User from "../interfaces/User.interface";
const util = require("util");

export default class MessageRepository {
  prisma = new PrismaClient();
  constructor() {}

  //// cria uma nova mensagem
  async create(message: Message): Promise<Message | ErrorConstructor> {
    try {
      if (
        message.text &&
        message.conversationId &&
        message.toId &&
        message.fromId
      ) {
        return await this.prisma.message.create({
          data: {
            text: message.text,
            toId: message.toId,
            fromId: message.fromId,
            conversationId: message.conversationId,
            to: {
              connect: {
                id: message.toId,
              },
            },
            from: {
              connect: {
                id: message.fromId,
              },
            },
          },
        });
      } else {
        throw new Error("campos obrigatórios não preenchidos");
      }
    } catch (error) {
      throw new Error("não foi possivel cadatrar a mesagem " + error);
    }
  }

  async getLastMessage(
    conversationId: number
  ): Promise<Message | ErrorConstructor> {
    try {
      return (await this.prisma.message.findFirst({
        where: {
          conversationId: conversationId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })) as Message;
    } catch (error) {
      throw new Error("não foi possivel listar as mensagens");
    }
  }

  ///// busca tods mensagens da conversação
  async getMessage(
    conversationId: number,
    page: number
  ): Promise<Message[] | ErrorConstructor> {
    try {
      return (await this.prisma.message.findMany({
        where: {
          conversationId: conversationId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: (page - 1) * 10,
        include: {
          conversation: true,
        },
      })) as Message[];
    } catch (error) {
      throw new Error("não foi possivel listar as mensagens");
    }
  }
}
