"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../src/services/User.service"));
const rollback_1 = __importDefault(require("./rollback"));
const rollback = new rollback_1.default();
const userServices = new User_service_1.default();
const user = {
    name: "rodrigo",
    email: "rodrigo@gmail.com",
    password: "123456",
};
describe("UserServices", () => {
    it("should be create user", async () => {
        const response = await userServices.create(user);
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
        await rollback.rollback();
    });
    it("should be get all users", async () => {
        await userServices.create(user);
        const response = await userServices.getAll();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
        await rollback.rollback();
    }),
        it("should search user", async () => {
            await userServices.create(user);
            const response = await userServices.search("rodrigo");
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
            expect(response[0].password).toBeFalsy();
            await rollback.rollback();
        });
    it("should be login user", async () => {
        await userServices.create(user);
        const response = await userServices.Login("rodrigo@gmail.com", "123456");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
        await rollback.rollback();
    });
    it("should be find one user by email", async () => {
        await userServices.create(user);
        const response = await userServices.findOne("rodrigo@gmail.com");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
        await rollback.rollback();
    });
    it("should be find one user by id", async () => {
        const resUser = await userServices.create(user);
        const response = await userServices.getOne(resUser.id);
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
        await rollback.rollback();
    });
});
