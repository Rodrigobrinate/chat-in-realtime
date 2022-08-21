import { PrismaClient, Users } from "@prisma/client";

    export default class UserServices {
        prisma = new PrismaClient();
        constructor () {
           
        } 
        
        async  rollback() {

        
            
               
               
             return  await this.prisma.message.deleteMany({}).then(async () => {

            return  await this.prisma.conversation.deleteMany({}).then(async () => {
                 return  await this.prisma.users.deleteMany({})
                })
             })
         
        }

        
    }