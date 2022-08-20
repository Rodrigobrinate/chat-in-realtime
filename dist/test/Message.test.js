"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_service_1 = __importDefault(require("../src/services/Message.service"));
const rollback_1 = __importDefault(require("./rollback"));
const rollback = new rollback_1.default();
const messageServices = new Message_service_1.default();
const User_service_1 = __importDefault(require("../src/services/User.service"));
const userServices = new User_service_1.default();
const Conversation_service_1 = __importDefault(require("../src/services/Conversation.service"));
const conversationService = new Conversation_service_1.default();
const message = {
    text: "teste",
    fromId: 1,
    toId: 1,
    conversationId: 1,
};
const user = {
    name: "rodrigo",
    email: "rodrigo@gmail.com",
    password: "123456",
};
describe("UserServices", () => {
    it("should be create message", async () => {
        await rollback.rollback();
        const resUser = await userServices.create(user);
        const resConversation = await conversationService.create(resUser.id, resUser.id);
        const message = {
            text: "teste",
            fromId: resUser.id,
            toId: resUser.id,
            conversationId: resConversation.id,
        };
        const response = await messageServices.create(message);
        expect(response).toBeInstanceOf(Object);
        expect(response.text).toBeTruthy();
        await rollback.rollback();
    }),
        it("should be get all messages", async () => {
            const resUser = await userServices.create(user);
            const resConversation = await conversationService.create(resUser.id, resUser.id);
            const message = {
                text: "teste",
                fromId: resUser.id,
                toId: resUser.id,
                conversationId: resConversation.id,
            };
            await messageServices.create(message);
            const response = await messageServices.getByConversation(resConversation.id, 1);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBe(1);
            await rollback.rollback();
        }),
        it("should be get last message", async () => {
            const resUser = await userServices.create(user);
            const resConversation = await conversationService.create(resUser.id, resUser.id);
            const message = {
                text: "teste",
                fromId: resUser.id,
                toId: resUser.id,
                conversationId: resConversation.id,
            };
            await messageServices.create(message);
            const response = await messageServices.getLastMessage(resConversation.id);
            expect(response).toBeInstanceOf(Object);
            await rollback.rollback();
        });
});
