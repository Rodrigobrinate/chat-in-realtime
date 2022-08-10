"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../services/User.service"));
const Message_service_1 = __importDefault(require("../services/Message.service"));
const Conversation_service_1 = __importDefault(require("../services/Conversation.service"));
const jwt = require("jsonwebtoken");
const userServices = new User_service_1.default();
const messageServices = new Message_service_1.default();
const conversationServices = new Conversation_service_1.default();
class ConversationController {
    //userServices: UserServices;
    constructor() { }
    //this.userServices = new UserServices();
    async getLastMessage(req, res) {
        const { id } = req.params;
        try {
            const response = await conversationServices.getLastMessage(parseInt(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel enviar mensagem" });
        }
    }
    async getMyConversations(req, res) {
        try {
            const response = await conversationServices.getMyConversations(req.body.user.id);
            return res.status(200).json({ conversations: response });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel listar as conversas", error: error });
        }
    }
    async create(req, res) {
        const { toId } = req.body;
        try {
            const Mayconversation = await conversationServices.getOneVerify(req.body.user.id, parseInt(toId));
            if (!Mayconversation) {
                const response = await conversationServices.create(parseInt(req.body.user.id), parseInt(toId));
                return res.status(200).json({ conversation: response });
            }
            else {
                return res.status(200).json({ conversation: Mayconversation });
            }
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel criar a conversa", error: error });
        }
    }
}
exports.default = ConversationController;
