"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../services/User.service"));
const userServices = new User_service_1.default();
describe("UserServices", () => {
    it("should be create user", async () => {
        const user = {
            name: "teste",
            email: "rodrigo@gmail.com" + Math.random(),
            password: "123456",
        };
        const response = await userServices.create(user);
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
    }),
        it("should be get all users", async () => {
            const response = await userServices.getAll();
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
        }),
        it("should search user", async () => {
            const response = await userServices.search("rodrigo");
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
        });
    it("should be login user", async () => {
        const response = await userServices.Login("rodirgo@gmail.com", "123456");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
    });
});
