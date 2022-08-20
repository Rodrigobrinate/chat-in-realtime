import User from "../src/interfaces/User.interface";
import UserServices from "../src/services/User.service";
const userServices = new UserServices();

describe("UserServices", () => {
    it("should be create user", async () => {
        const user = {
            name: "teste",
            email: "rodrigo@gmail.com"+Math.random(),
            password: "123456",
        } as User;
        const response = await  userServices.create(user) as User;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
    }),

    it("should be get all users", async () => {
        const response = await userServices.getAll();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
    }),

    it("should search user", async () => {
        const response = await userServices.search("rodrigo") as User[];
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].password).toBeFalsy()
    
    })

    it("should be login user", async () => {
        const response = await userServices.Login("rbp20199@gmail.com", "123456");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
    })
    it("should be find one user by email", async () => {
        const response = await userServices.findOne("rbp20199@gmail.com") as any;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
    })

    it("should be find one user by id", async () => {
        const response = await userServices.getOne(1) as any;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
    })
})