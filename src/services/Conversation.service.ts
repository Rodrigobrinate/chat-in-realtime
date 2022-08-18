import ConversationRepository from "../respositories/conversationRepository";
import Conversation from "../interfaces/Conversation.interface";

export default class ConversationServices {
  conversationRepository: ConversationRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
  }

  // cria uma nova conversa
  async create(
    fromId: number,
    toId: number
  ): Promise<Conversation | ErrorConstructor> {
    try {
      const Mayconversation = await this.getOneVerify(fromId, toId);
      if (!Mayconversation) {
        const conversation = await this.conversationRepository.create(
          fromId,
          toId
        );
        return conversation;
      } else {
//const getMyConversations = await this.getOneVerify(fromId, toId);
//console.log(getMyConversations, toId, fromId);
        throw new Error("não foi possivel cadatrar a conversa");
      }
    } catch (error) {
      throw new Error("não foi possivel cadatrar a conversa" + error);
    }
  }

  



  //busca todas coversa do usuario
  async getOneVerify(
    fromId: number,
    toId: number
  ): Promise<Conversation | any> {
    try {
      const conversation = await this.conversationRepository.getOneVerify(
        fromId,
        toId
      );
      return conversation;
    } catch (error) {
      throw new Error("não foi possivel encontrar a conversa " + error);
    }
  }

  /// busca todas coversa do usuario
  async getMyConversations(
    userId: number
  ): Promise<Conversation[] | ErrorConstructor> {
    try {
      const conversations =
        await this.conversationRepository.getMyConversations(userId);
      return conversations;
    } catch (error) {
      throw new Error("não foi possivel encontrar as conversas " + error);
    }
  }


  async visualization(
    userId: number,
    conversation: number
  ): Promise<Conversation | ErrorConstructor> {
    try {

      


      const response = await this.conversationRepository.visualization(
        userId,
        conversation
      );
      return response;
    } catch (error) {
      throw new Error("não foi possivel encontrar a conversa " + error);
    }
  }


  async getNewMessages(  userId: number,
    conversation: number){
    try {
      const response = await this.conversationRepository.getNewMessages(
        userId,
        conversation
      );


      return response.length;
    } catch (error) {
      throw new Error("não foi possivel encontrar a conversa " + error);
    }
  }
}
