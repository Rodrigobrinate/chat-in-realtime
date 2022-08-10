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
                return await this.prisma.users.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    },
                });
            }
            else {
                throw new Error("Missing fields");
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
    async findOne(email) {
        try {
            if (email) {
                const user = await this.prisma.users.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (util.isNull(user) || util.isUndefined(user)) {
                    throw new Error("User not found");
                }
                else {
                    return user;
                }
            }
        }
        catch (error) {
            throw new Error("não foi possivel encontrar o usuario");
        }
    }
}
exports.default = UserRepository;
