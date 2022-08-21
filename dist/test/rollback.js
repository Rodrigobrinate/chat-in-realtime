"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UserServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async rollback() {
        return await this.prisma.message.deleteMany({}).then(async () => {
            return await this.prisma.conversation.deleteMany({}).then(async () => {
                return await this.prisma.users.deleteMany({});
            });
        });
    }
}
exports.default = UserServices;
