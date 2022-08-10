"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageRepository_1 = __importDefault(require("../respositories/MessageRepository"));
class MessageServices {
    constructor() {
        this.messageRepository = new MessageRepository_1.default();
    }
    ///// cria uma nova mensagem
    async create(message) {
        try {
            const text = await this.messageRepository.create(message);
            return text;
        }
        catch (error) {
            throw new Error("não foi possivel cadastrar a menagem " + error);
        }
    }
    //// busca tods mensagens da conversação
    async getByConversation(conversationId, page) {
        try {
            const messages = await this.messageRepository.getMessage(conversationId, page);
            return messages;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar a messagem " + error);
        }
    }
    async getLastMessage(conversationId) {
        try {
            const conversation = await this.messageRepository.getLastMessage(conversationId);
            return conversation;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar a conversa " + error);
        }
    }
}
exports.default = MessageServices;
