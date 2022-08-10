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
                    },
                });
                const { password, ...userWithoutPassword } = resUser;
                return userWithoutPassword;
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
                }
            });
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
}
exports.default = UserRepository;
