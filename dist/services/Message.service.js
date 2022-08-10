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
            throw new Error("não foi possivel cadatrar o usuario" + error);
        }
    }
    //// busca tods mensagens da conversação
    async getMessage(conversationId, page) {
        //  try {
        const messages = await this.messageRepository.getMessage(conversationId, page);
        return messages;
        // } catch (error) {
        //     throw new Error("não foi possivel listar os usuarios");
        //}
    }
}
exports.default = MessageServices;
