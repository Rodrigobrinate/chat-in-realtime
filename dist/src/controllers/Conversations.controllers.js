"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_service_1 = __importDefault(require("../services/Conversation.service"));
const conversationServices = new Conversation_service_1.default();
class ConversationController {
    //userServices: UserServices;
    constructor() { }
    //this.userServices = new UserServices();
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
            const response = await conversationServices.create(parseInt(req.body.user.id), parseInt(toId));
            return res.status(200).json({ conversation: response });
        }
        catch (error) {
            const response = await conversationServices.create(parseInt(req.body.user.id), parseInt(toId));
            //console.log(response);
            return res
                .status(500)
                .json({ message: "não foi possivel criar a conversa", error: error });
        }
    }
    async getOneVerify(req, res) {
        const { toId } = req.body;
        try {
            const response = await conversationServices.getOneVerify(parseInt(req.body.user.id), parseInt(toId));
            return res.status(200).json({ conversation: response });
        }
        catch (error) {
            return res
                .status(404)
                .json({ message: "não foi possivel encontrar a conversa", error: error });
        }
    }
    async visualization(req, res) {
        const { conversation } = req.body;
        try {
            const response = await conversationServices.visualization(parseInt(req.body.user.id), parseInt(conversation.id));
            return res.status(200).json({ conversation: response });
        }
        catch (error) {
            return res
                .status(404)
                .json({ message: "não foi possivel encontrar a conversa", error: error });
        }
    }
}
exports.default = ConversationController;
