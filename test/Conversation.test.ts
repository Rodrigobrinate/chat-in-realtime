import Conversation from "../src/interfaces/Conversation.interface";
import UserServices from "../src/services/User.service";
import Rollback from "./rollback"
const rollback = new Rollback();
const userServices = new UserServices();
import ConversationServices from "../src/services/Conversation.service";
const conversationService = new ConversationServices();
import User from "../src/interfaces/User.interface";
const user = {
    name: "rodrigo",
    email: "rodrigo@gmail.com",
    password: "123456",
} as User;


describe("ConversationService",  () => {
    
    it("should be create conversation", async () => {
        await rollback.rollback()
       const resUser = await  userServices.create(user) as any;
        const response = await conversationService.create(resUser.id, resUser.id) as Conversation;
        expect(response).toBeInstanceOf(Object);
        await rollback.rollback()
    }),

    it("should be get all conversations by user", async () => {
        const resUser = await  userServices.create(user) as any;
        const resConversation = await conversationService.create(resUser.id, resUser.id) as any;
        const response = await conversationService.getMyConversations(resConversation.id) as Conversation[];
        expect(response).toBeInstanceOf(Array);
        await rollback.rollback()
    }),

    it("should be get all conversations", async () => {
        const resUser = await  userServices.create(user) as any;
        const resConversation = await conversationService.create(resUser.id, resUser.id) as any;
        const response = await conversationService.getOneVerify(resUser.id,resUser.id) as Conversation[];
        expect(response).toBeInstanceOf(Object);
        await rollback.rollback()
    })

})
