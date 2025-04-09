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
      .post("/login")
      .send({email:"hi",password:"hii"})
  
      expect(res.status).toBe(200);
    });
  

  });