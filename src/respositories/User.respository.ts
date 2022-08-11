import { PrismaClient, Users } from "@prisma/client";
import User from "../interfaces/User.interface";
const util = require('util');


export default class UserRepository {
  prisma = new PrismaClient();
  constructor() {}

  async create(user: User): Promise<User | ErrorConstructor> {
    try {
        
      if (user.email && user.name && user.password) {
        const resUser =  await this.prisma.users.create({
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
          },
        });
          
        const { password, ...userWithoutPassword } = resUser;
        return userWithoutPassword as User;
      } else {
        throw new Error("campos faltantes");
      }
    } catch (error) {
        
        throw new Error ("não foi possivel cadatrar o usuario"+error);
    }
  }


  async getAll(): Promise<User[] | ErrorConstructor> {
    try {
      return await this.prisma.users.findMany({
       
      });
    } catch (error) {
      throw new Error("não foi possivel listar os usuarios");
    }
  }

  async findOneByEmail(email: string): Promise<User | any > {
    try {
     
        const user =  await this.prisma.users.findFirst({
          where: {
            email: email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          }
        })
//
        if (util.isNull(user) || util.isUndefined(user)) {
          throw new Error("usuario não encontrado");
        } else {
          return user as User;
        }
      
    } catch (error) {
     throw new Error ("não foi possivel encontrar o usuario");
    }
  }


  async search(data: string): Promise<User[] | ErrorConstructor> {
    try {
    
        const user =  await this.prisma.users.findMany({
          where: {
            name: {
              contains: data,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
          take: 20,
        }) as User[];

        if (util.isNull(user) || util.isUndefined(user) ) {
          throw new Error("usuario não encontrado");
        } else {

          return user as User[];
        }
      
    } catch (error) {
      throw new Error("não foi possivel listar os usuarios");
    }
  }
}
