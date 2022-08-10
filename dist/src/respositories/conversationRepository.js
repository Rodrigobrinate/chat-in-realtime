"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const util = require("util");
class ConversationRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(user1Id, user2Id) {
        try {
            return await this.prisma.conversation.create({
                data: {
                    user1Id: user1Id,
                    user2Id: user2Id * 1,
                },
            });
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar o usuario" + error);
        }
    }
    //// busca tadas conversas do usuario logado iniciada por ele ou não 
    async getOneVerify(user1Id, user2Id) {
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
        }
        catch (error) {
            throw new Error("não foi possivel listar as conversas");
        }
    }
    //// busca as conversas do usuario logado
    async getMyConversations(userId) {
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
                            { user1Id: userId * 1 },
                            { user2Id: userId * 1 },
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
        }
        catch (error) {
            throw new Error("não foi possivel listar as conversas");
        }
    }
}
exports.default = ConversationRepository;
