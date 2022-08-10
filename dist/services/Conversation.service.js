"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = __importDefault(require("../respositories/conversation"));
class ConversationServices {
    constructor() {
        this.conversationRepository = new conversation_1.default();
    }
    async getLastMessage(conversationId) {
        try {
            const conversation = await this.conversationRepository.getLastMessage(conversationId);
            return conversation;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar a conversa " + error);
        }
    }
    // cria uma nova conversa
    async create(user1Id, user2Id) {
        try {
            const conversation = await this.conversationRepository.create(user1Id, user2Id);
            return conversation;
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar a conversa" + error);
        }
    }
    // busca tods mensagens da conversação
    async getOne(user1Id, user2Id) {
        try {
            const conversation = await this.conversationRepository.getOne(user1Id, user2Id);
            return conversation;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar a conversa " + error);
        }
    }
    //busca todas coversa do usuario
    async getOneVerify(user1Id, conversationId) {
        //  try {
        const conversation = await this.conversationRepository.getOneVerify(user1Id, conversationId);
        return conversation;
        // } catch (error) {
        //    throw new Error("não foi possivel encontrar a conversa "+error);
        // }
    }
    /// busca todas coversa do usuario
    async getMyConversations(userId) {
        try {
            const conversations = await this.conversationRepository.getMyConversations(userId);
            return conversations;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar as conversas " + error);
        }
    }
}
exports.default = ConversationServices;
