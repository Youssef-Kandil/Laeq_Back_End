import request from "supertest";
import createApp from "../CreateApp";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";


describe("Main API Test", () => {
  let app : Express
  beforeAll(() => {
     app = createApp();
  })
    it("should Be Return {State: 'Done'}", async () => {
      const res = await request(app).get("/")
  
      expect(res.status).toBe(200);
    });
  

  });