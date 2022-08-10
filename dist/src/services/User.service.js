"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_respository_1 = __importDefault(require("../respositories/User.respository"));
const jwt = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServices {
    constructor() {
        this.userRepository = new User_respository_1.default();
    }
    async create(user) {
        try {
            if (user.email && user.name && user.password) {
                user.password = bcrypt_1.default.hashSync(user.password, 8);
                return await this.userRepository.create(user);
            }
            else {
                throw new Error("Missing fields");
            }
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar o usuario" + error);
        }
    }
    async findOne(email) {
        try {
            return await this.userRepository.findOneByEmail(email);
        }
        catch (error) {
            throw new Error("não foi possivel encontrar o usuario");
        }
    }
    async getAll() {
        try {
            return await this.userRepository.getAll();
        }
        catch (error) {
            throw new Error("não foi possivel listar os usuarios");
        }
    }
    async Login(email, password) {
        try {
            const user = (await this.findOne(email));
            if (user) {
                const passwordIsValid = bcrypt_1.default.compareSync(password, user.password ? user.password : "");
                if (!passwordIsValid) {
                    throw new Error("usuario ou senha invalidos");
                }
                else {
                    const token = jwt.sign({ id: user.id }, "process.env.SECRET", {
                        expiresIn: 3600 * 24,
                    });
                    const { password, ...userWithoutPassword } = user;
                    return { auth: true, token: token, user: userWithoutPassword };
                }
            }
            else {
                return { message: "usuario não encontrado", status: 404 };
            }
        }
        catch (error) {
            return { message: "não foi possivel encontrar o usuario" + error, status: 500 };
        }
    }
    async search(data) {
        try {
            return await this.userRepository.search(data);
        }
        catch (error) {
            throw new Error("não foi possivel listar os usuarios");
        }
    }
}
exports.default = UserServices;
