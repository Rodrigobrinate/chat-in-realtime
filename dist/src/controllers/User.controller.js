"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../services/User.service"));
//import { Request, Response } from "express";
const index_1 = __importDefault(require("../mail/index"));
const userServices = new User_service_1.default();
const index = new index_1.default();
class UserController {
    //userServices: UserServices;
    constructor() {
        //this.userServices = new UserServices();
    }
    async CreateUser(req, res) {
        const { name, email, password } = req.body;
        const user = {
            name: name,
            email: email,
            password: password,
        };
        if (!name || !email || !password) {
            return res.status(400).json({ message: "preecha todos os campos" });
        }
        else {
            try {
                const response = await userServices.create(user);
                const a = await index.sendMail(email, "emailVerify", { name: name, email: email, id: response.id });
                console.log(a);
                return res.status(200).json({ user: response });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "não foi possivel cadatrar o usuario", error: error });
            }
        }
    }
    async GetAllUsers(req, res) {
        try {
            const response = await userServices.getAll();
            return res.status(200).json({ users: response });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "não foi possivel listar os usuarios", error: error });
        }
    }
    async LoginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "preencha todos os campos" });
        }
        else {
            try {
                const data = await userServices.Login(email, password);
                return res.status(data.status || 200).json(data);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "ops!  " + error });
            }
        }
    }
    async updateProfileImage(req, res) {
        const { filename } = req.body;
        const id = req.body.user.id;
        if (!filename) {
            return res.status(400).json({ message: "preencha todos os campos", });
        }
        else {
            try {
                const response = await userServices.updateProfileImage(parseInt(id), filename);
                return res.status(200).json({ user: filename });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "não foi possivel atualizar o usuario ", filename: req.body, error: error });
            }
        }
    }
    async updateBackgroundImage(req, res) {
        const { filename } = req.body;
        const id = req.body.user.id;
        if (!filename) {
            return res.status(400).json({ message: "preencha todos os campos", });
        }
        else {
            try {
                const response = await userServices.updateBackgroundImage(parseInt(id), filename);
                return res.status(200).json({ user: filename });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "não foi possivel atualizar o usuario ", filename: req.body, error: error });
            }
        }
    }
}
exports.default = UserController;
