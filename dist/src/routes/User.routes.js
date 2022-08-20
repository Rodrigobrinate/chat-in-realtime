"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const jwtVerify_1 = __importDefault(require("../middleware/jwtVerify"));
const User_service_1 = __importDefault(require("../services/User.service"));
const userServices = new User_service_1.default();
const multer = require('multer');
const path_1 = __importDefault(require("path"));
//import uploadMiddleware from '../middleware/Upload';
const userController = new User_controller_1.default();
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use(router);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path_1.default.join(__dirname, '../../src/public'));
        cb(null, path_1.default.join(__dirname, '../../../src/public/profile'));
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];
        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = new Date().getTime() + '.' + extensaoArquivo;
        req.body.filename = `${novoNomeArquivo}`;
        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}`);
    }
});
const uploadMiddleware = multer({ storage });
router.post("/login", userController.LoginUser);
router.post("/register", userController.CreateUser);
router.get("/", userController.GetAllUsers);
router.post("/update_profile_image", [uploadMiddleware.single('profile_image'), jwtVerify_1.default,], userController.updateProfileImage);
router.post("/update_background_image", [uploadMiddleware.single('background_image'), jwtVerify_1.default,], userController.updateBackgroundImage);
exports.default = router;
