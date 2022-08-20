import User from "../src/interfaces/User.interface";
import UserServices from "../src/services/User.service";
import Rollback from "./rollback"
const rollback = new Rollback();
const userServices = new UserServices();
 const user = {
            name: "rodrigo",
            email: "rodrigo@gmail.com",
            password: "123456",
        } as User;
describe("UserServices", () => {
   
    it("should be create user", async () => {
       
        const response = await  userServices.create(user) as User;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
        
       await rollback.rollback()

    })

    it("should be get all users", async () => {
        await  userServices.create(user)
        const response = await userServices.getAll();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
        await rollback.rollback()
        
       
    }),

    it("should search user", async () => {
         await  userServices.create(user) as User;
        const response = await userServices.search("rodrigo") as User[];
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].password).toBeFalsy()
        await rollback.rollback()
    })

    it("should be login user", async () => {
        await  userServices.create(user) as User;
        const response = await userServices.Login("rodrigo@gmail.com", "123456");
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeFalsy();
        await rollback.rollback()
    })
    it("should be find one user by email", async () => {
        await  userServices.create(user) as User;
        const response = await userServices.findOne("rodrigo@gmail.com") as any;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
       await rollback.rollback()
    })

    it("should be find one user by id", async () => {
       const resUser = await  userServices.create(user) as any;
        const response = await userServices.getOne(resUser.id) as any;
        expect(response).toBeInstanceOf(Object);
        expect(response.password).toBeTruthy();
        await rollback.rollback()
    })
})