"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const util = require("util");
class MessageRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    //// cria uma nova mensagem
    async create(message) {
        try {
            if (message.text &&
                message.conversationId &&
                message.toId &&
                message.fromId) {
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
            }
            else {
                throw new Error("campos obrigatórios não preenchidos");
            }
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar a mesagem " + error);
        }
    }
    async getLastMessage(conversationId) {
        try {
            return (await this.prisma.message.findFirst({
                where: {
                    conversationId: conversationId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }));
        }
        catch (error) {
            throw new Error("não foi possivel listar as mensagens");
        }
    }
    ///// busca tods mensagens da conversação
    async getMessage(conversationId, page) {
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
                    conversation: {
                        include: {
                            user1: {
                                select: {
                                    id: true,
                                    profile_image: true
                                }
                            },
                            user2: {
                                select: {
                                    id: true,
                                    profile_image: true
                                }
                            },
                        }
                    },
                },
            }));
        }
        catch (error) {
            throw new Error("não foi possivel listar as mensagens");
        }
    }
}
exports.default = MessageRepository;
