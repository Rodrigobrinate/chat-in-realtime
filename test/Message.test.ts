import Message from "../src/interfaces/Message.interface";
import MessageServices from "../src/services/Message.service";
import Rollback from "./rollback"
const rollback = new Rollback();
const messageServices = new MessageServices();
import UserServices from "../src/services/User.service";
const userServices = new UserServices();
import ConversationServices from "../src/services/Conversation.service";
import Conversation from "../src/interfaces/Conversation.interface";
import User from "../src/interfaces/User.interface";
const conversationService = new ConversationServices();

 const message = {
            text: "teste",
            fromId: 1,
            toId: 1,
            conversationId: 1,
        } as Message;

        const user = {
            name: "rodrigo",
            email: "rodrigo@gmail.com",
            password: "123456",
        } as User;

describe("UserServices",  () => {
   
    it("should be create message", async () => {
         await rollback.rollback()
        const resUser = await  userServices.create(user) as any;
        const resConversation = await conversationService.create(resUser.id, resUser.id) as any;
        const message = {
            text: "teste",
            fromId: resUser.id,
            toId: resUser.id,
            conversationId: resConversation.id,
        }
        const response = await messageServices.create(message) as Message;
        expect(response).toBeInstanceOf(Object);
        expect(response.text).toBeTruthy();
        await rollback.rollback()
    }),

    it("should be get all messages", async () => {
        const resUser = await  userServices.create(user) as any;
        const resConversation = await conversationService.create(resUser.id, resUser.id) as any;
        const message = {
            text: "teste",
            fromId: resUser.id,
            toId: resUser.id,
            conversationId: resConversation.id,
        }
        await messageServices.create(message) as Message;
        const response = await messageServices.getByConversation(resConversation.id, 1);
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBe(1);
        await rollback.rollback()
    }),
    it("should be get last message", async () => {
        const resUser = await  userServices.create(user) as any;
        const resConversation = await conversationService.create(resUser.id, resUser.id) as any;
        const message = {
            text: "teste",
            fromId: resUser.id,
            toId: resUser.id,
            conversationId: resConversation.id,
        }
       await messageServices.create(message) as Message;
        const response = await messageServices.getLastMessage(resConversation.id);
        expect(response).toBeInstanceOf(Object);
        await rollback.rollback()
    })

})