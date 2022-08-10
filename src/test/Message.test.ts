import Message from "../interfaces/Message.interface";
import MessageServices from "../services/Message.service";
const messageServices = new MessageServices();

describe("UserServices", () => {

    it("should be create message", async () => {
        const message = {
            text: "teste",
            fromId: 1,
            toId: 2,
            conversationId: 1,
        } as Message;
        const response = await messageServices.create(message) as Message;
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
    })

})