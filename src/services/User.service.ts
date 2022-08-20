import UserRepository from "../respositories/User.respository";
import User from "../interfaces/User.interface";
import Error from "../interfaces/Error.interface";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export default class UserServices {
  userRepository : UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    }

   async create(user: User): Promise<User | ErrorConstructor> {
    try {
       
        if (user.email && user.name && user.password) {
        user.password = bcrypt.hashSync(user.password, 8);
        
      return await this.userRepository.create(user);
    } else {
        throw new Error("Missing fields");
        }
    } catch (error) { 
      throw new Error("não foi possivel cadatrar o usuario"+error);
    }
  }


   async findOne(email: string): Promise<User | ErrorConstructor> {
try {
      return await this.userRepository.findOneByEmail(email);
    } catch (error) {
     throw new Error("não foi possivel encontrar o usuario");
   }
  }


  async getAll(): Promise<User[] | ErrorConstructor> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw new Error("não foi possivel listar os usuarios");
    }
  }

  async getOne(id: number): Promise<User | ErrorConstructor> {
    try {
      return await this.userRepository.getOne(id);
    } catch (error) {
      throw new Error("não foi possivel listar os usuarios");
    }
  }


   async Login(email: string, password: string): Promise<Error | any> {
try {
      const user = (await this.findOne(email)) as User;
      
      if (user && user.password ) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          throw new Error("email ou senha invalidos");
        } else {
          const token = jwt.sign({ id: user.id }, "process.env.SECRET", {
            expiresIn: 3600 * 24,
          });
          const { password, ...userWithoutPassword } = user;
          return { auth: true, token: token, user: userWithoutPassword };
        }
      } else {
        return { message: "email ou senha icorreta", status: 404, user };
      }
   } catch (error) {
     
      return { message: "não foi possivel fazer login " , status: 500 };
    }
  }

  async search(data: string): Promise<User[] | ErrorConstructor> {
    try {
      return await this.userRepository.search(data);
    } catch (error) {
      throw new Error("não foi possivel listar os usuarios");
    }
  }


  async updateProfileImage(id: number, filename: string): Promise<User | ErrorConstructor> {
    try {

      const user = (await this.getOne(id)) as User;

      if (user) {
        if (user.profile_image != "profile_default.jpg"){
      fs.rm(path.join(__dirname, '../../../src/public/profile/', user.profile_image || " ")  , { recursive:true }, (err:any) => {
        if(err){
            // File deletion failed
            console.error(err.message);
            return;
        }
    })}
      return await this.userRepository.updateProfileImage(id, filename);
  } else {    
    throw new Error("não foi possivel atualizar o usuario");
  } 
}catch (error) {
      throw new Error("não foi possivel atualizar o usuario");
    }
    }


    async updateBackgroundImage(id: number, filename: string): Promise<User | ErrorConstructor> {
      try {
  
        const user = (await this.getOne(id)) as User;
  
        if (user) {
          if (user.background_image != "background_default.jpg"){
        fs.rm(path.join(__dirname, '../../../src/public/profile/', user.background_image || " ")  , { recursive:true }, (err:any) => {
          if(err){
              // File deletion failed
              console.error(err.message);
              return;
          }
      })}
        return await this.userRepository.updateBackgroundImage(id, filename);
    } else {    
      throw new Error("não foi possivel atualizar o usuario");
    } 
  }catch (error) {
        throw new Error("não foi possivel atualizar o usuario");
      }
      }
}
