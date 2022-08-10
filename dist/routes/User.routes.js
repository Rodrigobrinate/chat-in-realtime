"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const User_service_1 = __importDefault(require("../services/User.service"));
const userServices = new User_service_1.default();
const userController = new User_controller_1.default();
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use(router);
router.post("/login", userController.LoginUser);
router.post("/register", userController.CreateUser);
router.get("/", userController.GetAllUsers);
exports.default = router;
