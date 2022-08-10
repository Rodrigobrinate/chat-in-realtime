
export default interface Message {
    
    id?: number
    text: string | null
    conversationId: number
    toId: number 
    fromId: number 
    createdAt?: Date
    updatedAt?: Date
}