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
            profile_image: "user_default.png",
            background_image: "background_default.jpg"
          },
        });
          
        resUser.password == null
        return resUser as User;
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
            profile_image: true,
            background_image: true,
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


  async updateProfileImage(id: number, filename: string): Promise<User | ErrorConstructor> {

    try {
      const user = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          profile_image: filename,
        },
      });
      return user as User;
    } catch (error) {
      throw new Error("não foi possivel atualizar o usuario");
    }
  }
  async updateBackgroundImage(id: number, filename: string): Promise<User | ErrorConstructor> {

    try {
      const user = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          background_image: filename,
        },
      });
      return user as User;
    } catch (error) {
      throw new Error("não foi possivel atualizar o usuario");
    }
  }


  async getOne(id: number): Promise<User | ErrorConstructor> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          profile_image: true,
          background_image: true,
        },
      });
      return user as User;
    } catch (error) {
      throw new Error("não foi possivel encontrar o usuario");
    }
  }
}
