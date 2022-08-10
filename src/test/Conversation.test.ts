import Conversation from "../interfaces/Conversation.interface";

import ConversationServices from "../services/Conversation.service";
const conversationService = new ConversationServices();

describe("ConversationService", () => {
    it("should be create conversation", async () => {
        const response = await conversationService.create(1,3) as Conversation;
        expect(response).toBeInstanceOf(Object);
    }),

    it("should be get all conversations by user", async () => {
        const response = await conversationService.getMyConversations(1) as Conversation[];
        expect(response).toBeInstanceOf(Array);
    }),

    it("should be get all conversations", async () => {
        const response = await conversationService.getOneVerify(1,2) as Conversation[];
        expect(response).toBeInstanceOf(Object);
    })

})
