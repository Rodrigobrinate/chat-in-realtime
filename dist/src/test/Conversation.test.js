"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_service_1 = __importDefault(require("../services/Conversation.service"));
const conversationService = new Conversation_service_1.default();
describe("ConversationService", () => {
    it("should be create conversation", async () => {
        const response = await conversationService.create(1, 3);
        expect(response).toBeInstanceOf(Object);
    }),
        it("should be get all conversations by user", async () => {
            const response = await conversationService.getMyConversations(1);
            expect(response).toBeInstanceOf(Array);
        }),
        it("should be get all conversations", async () => {
            const response = await conversationService.getOneVerify(1, 2);
            expect(response).toBeInstanceOf(Object);
        });
});
