import express, { Request, Response } from "express";

import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

// === Middlewares ===
import { verifyJWT } from "./Middlewares/auth";


// === Routes ===
import adminUserRouter from "./Routers/admin_users_Routers";
import loginRouter from "./Routers/login_Router";
import test from "./Routers/test"


export default function createApp(){
    const app = express();

    // ========= MIDDLEWARES =======
    app.use(cookieParser());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(compression());

     

    app.use('/Public', express.static(path.join(__dirname, 'Public')));

    // === START LIMITER ===
    app.set('trust proxy', 'loopback, linklocal, uniquelocal');

    app.use( rateLimit({
        windowMs: 15 * 60 * 1000, // 15 دقيقة
        max: 100, // السماح بـ 100 طلب فقط خلال 15 دقيقة لكل IP
        message: { error: "Too many requests, please try again later." },
        standardHeaders: true, // إرجاع الهيدر `RateLimit-*`
        legacyHeaders: false, // تعطيل `X-RateLimit-*`
    }));

    // === START MTTPS ONLY ===
    app.use(helmet.hsts({ 
    maxAge: 31536000, 
    includeSubDomains: true, 
    preload: true 
    }));

    // === START XSS PROTECTOR ===
    app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
    }));

    app.use((req, res, next) => {
       res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Access-Control-Allow-Credentials'] ,
    credentials: true,
    }));
    // ========= CUSTUM MIDDLEWARES =======
     app.use(verifyJWT);

    // ========= ROUTES ============
    app.use(test);
    app.use(adminUserRouter);
    app.use(loginRouter);


    // === ABOUT API END POINTS ===
    app.get('/check-version', (req, res) => {
        res.send({version:"1.0.0",versionTitle:"Creators new vesion",versionMSG:""});
    })

    app.get('/current_dateTime', (req, res) => {
        res.send({dateTime:new Date()});
    })

    app.get('/img', (req, res) => {
        res.send(`<img src="https://----/public/images/1.png" alt="Lights" style="width:100%"/>`);
    })


    return app;

    
}


