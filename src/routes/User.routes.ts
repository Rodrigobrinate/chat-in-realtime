import express from 'express';
import { Router, Request, Response } from 'express';
import UserController from '../controllers/User.controller';
import verifyJWT from '../middleware/jwtVerify';
import UserServices from '../services/User.service';
const userServices = new UserServices();
import upload from '../middleware/Upload';
const multer = require('multer');
import path from 'path';
//import uploadMiddleware from '../middleware/Upload';


const userController = new UserController();

const app = express();


const router = Router()
app.use(router)

const storage =  multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    console.log(path.join(__dirname, '../../src/public'))
      cb(null, path.join(__dirname, '../../../src/public/profile') )
  },
  filename: function (req: any, file: any, cb: any) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1];

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = new Date().getTime() + '.' + extensaoArquivo;
      req.body.filename = `${novoNomeArquivo}`

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}`)
  }
});



 const  uploadMiddleware = multer({ storage });
  router.post("/login", userController.LoginUser);
  router.post("/register", userController.CreateUser);
  router.get("/", userController.GetAllUsers);
  router.post("/update_profile_image",[uploadMiddleware.single('profile_image'), verifyJWT, ], userController.updateProfileImage);
  router.post("/update_background_image",[uploadMiddleware.single('background_image'), verifyJWT, ], userController.updateBackgroundImage);

export default router;


