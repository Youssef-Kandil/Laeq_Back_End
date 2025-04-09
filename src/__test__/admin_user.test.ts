import request from "supertest";
import createApp from "../CreateApp";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";


describe("Admin Users End Points Test", () => {
  let app : Express
  beforeAll(() => {
     app = createApp();
  })
    it(`create Admin Acount should Be Return {"authUser": {},"adminUser": {}}`, async () => {
      const res = await request(app)
      .post("/create_admin_account")
      .send({full_name:"eng.Youssef_Kandil",email:"Test@gimail.com",password:"testPassword",phone:"ww",Gtoken:"",register_with_google:"ww"})
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("authUser");
      expect(res.body).toHaveProperty("adminUser");
      expect(res.body.authUser).toHaveProperty("id");
      expect(res.body.adminUser).toHaveProperty("id");
    });
  

  });