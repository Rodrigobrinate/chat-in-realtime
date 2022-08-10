"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversationRepository_1 = __importDefault(require("../respositories/conversationRepository"));
class ConversationServices {
    constructor() {
        this.conversationRepository = new conversationRepository_1.default();
    }
    // cria uma nova conversa
    async create(fromId, toId) {
        try {
            const Mayconversation = await this.getOneVerify(fromId, toId);
            if (!Mayconversation) {
                const conversation = await this.conversationRepository.create(fromId, toId);
                return conversation;
            }
            else {
                throw new Error("não foi possivel cadatrar a conversa");
            }
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar a conversa" + error);
        }
    }
    //busca todas coversa do usuario
    async getOneVerify(fromId, toId) {
        try {
            const conversation = await this.conversationRepository.getOneVerify(fromId, toId);
            return conversation;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar a conversa " + error);
        }
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
