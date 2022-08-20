"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UserServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async rollback() {
        const teste = await this.prisma.$transaction([
            this.prisma.$executeRaw `DELETE FROM message `,
            this.prisma.$executeRaw `DELETE FROM conversation `,
            this.prisma.$executeRaw `DELETE FROM users `,
        ]);
        teste.map((item) => {
            return item;
        });
    }
}
exports.default = UserServices;
