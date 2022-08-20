"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../src/services/User.service"));
const rollback_1 = __importDefault(require("./rollback"));
const rollback = new rollback_1.default();
const userServices = new User_service_1.default();
const Conversation_service_1 = __importDefault(require("../src/services/Conversation.service"));
const conversationService = new Conversation_service_1.default();
const user = {
    name: "rodrigo",
    email: "rodrigo@gmail.com",
    password: "123456",
};
describe("ConversationService", () => {
    it("should be create conversation", async () => {
        await rollback.rollback();
        const resUser = await userServices.create(user);
        const response = await conversationService.create(resUser.id, resUser.id);
        expect(response).toBeInstanceOf(Object);
        await rollback.rollback();
    }),
        it("should be get all conversations by user", async () => {
            const resUser = await userServices.create(user);
            const resConversation = await conversationService.create(resUser.id, resUser.id);
            const response = await conversationService.getMyConversations(resConversation.id);
            expect(response).toBeInstanceOf(Array);
            await rollback.rollback();
        }),
        it("should be get all conversations", async () => {
            const resUser = await userServices.create(user);
            const resConversation = await conversationService.create(resUser.id, resUser.id);
            const response = await conversationService.getOneVerify(resUser.id, resUser.id);
            expect(response).toBeInstanceOf(Object);
            await rollback.rollback();
        });
});
