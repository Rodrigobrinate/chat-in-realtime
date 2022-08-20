"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_respository_1 = __importDefault(require("../respositories/User.respository"));
const jwt = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
    async getOne(id) {
        try {
            return await this.userRepository.getOne(id);
        }
        catch (error) {
            throw new Error("não foi possivel listar os usuarios");
        }
    }
    async Login(email, password) {
        try {
            const user = (await this.findOne(email));
            if (user && user.password) {
                const passwordIsValid = bcrypt_1.default.compareSync(password, user.password);
                if (!passwordIsValid) {
                    throw new Error("email ou senha invalidos");
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
                return { message: "email ou senha icorreta", status: 404, user };
            }
        }
        catch (error) {
            return { message: "não foi possivel fazer login ", status: 500 };
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
    async updateProfileImage(id, filename) {
        try {
            const user = (await this.getOne(id));
            if (user) {
                if (user.profile_image != "profile_default.jpg") {
                    fs_1.default.rm(path_1.default.join(__dirname, '../../../src/public/profile/', user.profile_image || " "), { recursive: true }, (err) => {
                        if (err) {
                            // File deletion failed
                            console.error(err.message);
                            return;
                        }
                    });
                }
                return await this.userRepository.updateProfileImage(id, filename);
            }
            else {
                throw new Error("não foi possivel atualizar o usuario");
            }
        }
        catch (error) {
            throw new Error("não foi possivel atualizar o usuario");
        }
    }
    async updateBackgroundImage(id, filename) {
        try {
            const user = (await this.getOne(id));
            if (user) {
                if (user.background_image != "background_default.jpg") {
                    fs_1.default.rm(path_1.default.join(__dirname, '../../../src/public/profile/', user.background_image || " "), { recursive: true }, (err) => {
                        if (err) {
                            // File deletion failed
                            console.error(err.message);
                            return;
                        }
                    });
                }
                return await this.userRepository.updateBackgroundImage(id, filename);
            }
            else {
                throw new Error("não foi possivel atualizar o usuario");
            }
        }
        catch (error) {
            throw new Error("não foi possivel atualizar o usuario");
        }
    }
}
exports.default = UserServices;
