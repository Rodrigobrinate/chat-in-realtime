import { PrismaClient, Users } from "@prisma/client";

    export default class UserServices {
        prisma = new PrismaClient();
        constructor () {
           
        } 
        
        async  rollback() {

            const teste = await this.prisma.$transaction([
                this.prisma.users.deleteMany({}),
                this.prisma.conversation.deleteMany({}),
                this.prisma.message.deleteMany({}),
              ])

              teste.map((item: any) => {
               
                return item
                
              })
        }

        
    }