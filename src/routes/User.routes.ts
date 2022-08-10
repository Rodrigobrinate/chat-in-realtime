import express from 'express';
import { Router, Request, Response } from 'express';
import UserController from '../controllers/User.controller';
import UserServices from '../services/User.service';
const userServices = new UserServices();

const userController = new UserController();

const app = express();


const router = Router()
app.use(router)


  

  router.post("/login", userController.LoginUser);
  router.post("/register", userController.CreateUser);
  router.get("/", userController.GetAllUsers);

export default router;