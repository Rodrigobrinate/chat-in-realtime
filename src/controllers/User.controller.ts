import UserServices from "../services/User.service";
import User from "../interfaces/User.interface";
//import { Request, Response } from "express";
import Index from '../mail/index';
const userServices = new UserServices();
const index= new Index();

export default class UserController {
    //userServices: UserServices;
    
  constructor( ) {
    //this.userServices = new UserServices();
  }

  
  async CreateUser(req: any, res: any) {
    const { name, email, password } = req.body;
    const user = {
        name: name,
        email: email,
        password: password,
    } as User;
        
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "preecha todos os campos" });
    } else {
      try {
       
       
        const response = await userServices.create(user) as User;
        const a =  await index.sendMail(email,"emailVerify",{name: name, email: email, id: response.id});
        console.log(a);
        return res.status(200).json({ user: response });
       
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "ocorreu um erro ao cadatrar o usuario" , error: error})
      }
    }
  }

  async GetAllUsers(req: any, res: any) {
    try {
      const response = await userServices.getAll() as User[];
      return res.status(200).json({ users: response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "não foi possivel listar os usuarios" , error: error})
    } 
  }
  async LoginUser(req: any, res: any) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "preencha todos os campos" });
    } else {
   try {
        const data = await userServices.Login( email, password );
        
          return res.status(data.status || 200).json(data);
     } catch (error) {
       return res
          .status(500)
          .json({ message: "ops!  "+error });
      }
    }
  }

  async updateProfileImage(req: any, res: any){
    const { filename } = req.body;
    const id = req.body.user.id 
    if (!filename) {
      return res.status(400).json({ message: "preencha todos os campos", })
    } else {
      try {
        const response = await userServices.updateProfileImage(parseInt(id), filename) as User;
        return res.status(200).json({ user:filename });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel atualizar o usuario ",filename: req.body, error: error });
      }
    }
  }


  async updateBackgroundImage(req: any, res: any){
    const { filename } = req.body;
    const id = req.body.user.id 
    if (!filename) {
      return res.status(400).json({ message: "preencha todos os campos", })
    } else {
      try {
        const response = await userServices.updateBackgroundImage(parseInt(id), filename) as User;
        return res.status(200).json({ user:filename });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel atualizar o usuario ",filename: req.body, error: error });
      }
    }
  }
}
