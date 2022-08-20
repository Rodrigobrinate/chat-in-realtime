"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_service_1 = __importDefault(require("../services/Message.service"));
const Conversation_service_1 = __importDefault(require("../services/Conversation.service"));
const conversationServices = new Conversation_service_1.default();
const messageServices = new Message_service_1.default();
class UserController {
    constructor() { }
    async CreateMessage(req, res) {
        const { text, userId, conversationId } = req.body;
        //console.log(req.body);
        if (!text || !userId) {
            return res.status(400).json({ message: "preencha todos os campos" });
        }
        else {
            try {
                const message = {
                    text: text,
                    toId: parseInt(req.body.user.id),
                    fromId: parseInt(userId),
                    conversationId: parseInt(conversationId),
                };
                const response = await messageServices.create(message);
                return res.status(200).json({ message: response });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "não foi possivel enviar mensagem" });
            }
        }
    }
    async getLastMessage(req, res) {
        const { id } = req.params;
        try {
            const numberofnewmessages = await conversationServices.getNewMessages(parseInt(req.body.user.id), parseInt(id));
            const response = await messageServices.getLastMessage(parseInt(id));
            return res.status(200).json({ message: response, numberofnewmessages: numberofnewmessages });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel enviar mensagem" });
        }
    }
    async GetMessages(req, res) {
        const { id, page } = req.params;
        if (!id) {
            return res.status(400).json({ message: "preencha todos os campos" });
        }
        else {
            try {
                const response = await messageServices.getByConversation(parseInt(id), parseInt(page));
                return res.status(200).json({ messages: response });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "não foi possivel enviar mensagem" });
            }
        }
    }
}
exports.default = UserController;
