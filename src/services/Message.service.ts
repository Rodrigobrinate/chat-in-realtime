import MessageRepository from "../respositories/MessageRepository";
import Message from "../interfaces/Message.interface";

export default class MessageServices {
  messageRepository : MessageRepository;

  constructor() {
   
    this.messageRepository = new MessageRepository();
    }


    ///// cria uma nova mensagem
    async create(message: Message): Promise<Message | ErrorConstructor> {
        try {
            const text = await this.messageRepository.create(message);
            return text; 
        } catch (error) {
            throw new Error("não foi possivel cadastrar a menagem "+error);
        }
    }


    //// busca tods mensagens da conversação
    async getByConversation(conversationId: number, page: number): Promise<Message[] | ErrorConstructor> {
        try {
            const messages = await this.messageRepository.getMessage(conversationId, page);
            return messages;
        } catch (error) {
            throw new Error("não foi possivel encontrar a messagem "+error);
        }
    }


    async getLastMessage(conversationId: number): Promise<Message | ErrorConstructor> {
        try {
            const conversation = await this.messageRepository.getLastMessage(conversationId) as Message;
            return conversation ;
        } catch (error) {
            throw new Error("não foi possivel encontrar a conversa "+error);
        }
    }
    


}
