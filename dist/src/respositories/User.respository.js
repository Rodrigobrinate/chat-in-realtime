"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const util = require('util');
class UserRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(user) {
        try {
            if (user.email && user.name && user.password) {
                const resUser = await this.prisma.users.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        profile_image: "user_default.png",
                        background_image: "background_default.jpg"
                    },
                });
                resUser.password == null;
                return resUser;
            }
            else {
                throw new Error("campos faltantes");
            }
        }
        catch (error) {
            throw new Error("não foi possivel cadatrar o usuario" + error);
        }
    }
    async getAll() {
        try {
            return await this.prisma.users.findMany({});
        }
        catch (error) {
            throw new Error("não foi possivel listar os usuarios");
        }
    }
    async findOneByEmail(email) {
        try {
            const user = await this.prisma.users.findFirst({
                where: {
                    email: email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    profile_image: true,
                    background_image: true,
                }
            });
            //
            if (util.isNull(user) || util.isUndefined(user)) {
                throw new Error("usuario não encontrado");
            }
            else {
                return user;
            }
        }
        catch (error) {
            throw new Error("não foi possivel encontrar o usuario");
        }
    }
    async search(data) {
        try {
            const user = await this.prisma.users.findMany({
                where: {
                    name: {
                        contains: data,
                    },
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
                take: 20,
            });
            if (util.isNull(user) || util.isUndefined(user)) {
                throw new Error("usuario não encontrado");
            }
            else {
                return user;
            }
        }
        catch (error) {
            throw new Error("não foi possivel listar os usuarios");
        }
    }
    async updateProfileImage(id, filename) {
        try {
            const user = await this.prisma.users.update({
                where: {
                    id: id,
                },
                data: {
                    profile_image: filename,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("não foi possivel atualizar o usuario");
        }
    }
    async updateBackgroundImage(id, filename) {
        try {
            const user = await this.prisma.users.update({
                where: {
                    id: id,
                },
                data: {
                    background_image: filename,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("não foi possivel atualizar o usuario");
        }
    }
    async getOne(id) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    profile_image: true,
                    background_image: true,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("não foi possivel encontrar o usuario");
        }
    }
}
exports.default = UserRepository;
