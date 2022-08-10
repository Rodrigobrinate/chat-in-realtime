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
        const response = await userServices.search("rodrigo");
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
    
    })

    it("should be login user", async () => {
        const response = await userServices.Login("rodirgo@gmail.com", "123456");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
    })
})