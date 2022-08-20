"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_service_1 = __importDefault(require("../src/services/Message.service"));
const messageServices = new Message_service_1.default();
describe("UserServices", () => {
    it("should be create message", async () => {
        const message = {
            text: "teste",
            fromId: 1,
            toId: 2,
            conversationId: 1,
        };
        const response = await messageServices.create(message);
        expect(response).toBeInstanceOf(Object);
        expect(response.text).toBeTruthy();
    }),
        it("should be get all messages", async () => {
            const response = await messageServices.getByConversation(1, 1);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBe(10);
        }),
        it("should be get last message", async () => {
            const response = await messageServices.getLastMessage(1);
            expect(response).toBeInstanceOf(Object);
        });
});
