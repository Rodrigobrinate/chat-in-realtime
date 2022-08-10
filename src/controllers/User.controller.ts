import UserServices from "../services/User.service";
import User from "../interfaces/User.interface";
import { Request, Response } from "express";
const userServices = new UserServices();
export default class UserController {
    //userServices: UserServices;
    
  constructor( ) {
    //this.userServices = new UserServices();
  }

  
  async CreateUser(req: Request, res: Response) {
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
        return res.status(200).json({ user: response });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel cadatrar o usuario" , error: error})
      }
    }
  }

  async GetAllUsers(req: Request, res: Response) {
    try {
      const response = await userServices.getAll() as User[];
      return res.status(200).json({ users: response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "não foi possivel listar os usuarios" , error: error})
    } 
  }
  async LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "preencha todos os campos" });
    } else {
   try {
        const data = await userServices.Login( email, password );
        
          return res.status(200).json(data);
     } catch (error) {
        return res
          .status(500)
          .json({ message: "não foi possivel encontrar o usuario", error: error });
      }
    }
  }
}
