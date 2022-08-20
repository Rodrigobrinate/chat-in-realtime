import { PrismaClient, Users } from "@prisma/client";

    export default class UserServices {
        prisma = new PrismaClient();
        constructor () {
           
        } 
        
        async  rollback() {

            const teste = await this.prisma.$transaction([
                this.prisma.$executeRaw`DELETE FROM message `,
                this.prisma.$executeRaw`DELETE FROM conversation `,
                this.prisma.$executeRaw`DELETE FROM users `,
              ])

              teste.map((item: any) => {
               
                return item
                
              })
        }

        
    }