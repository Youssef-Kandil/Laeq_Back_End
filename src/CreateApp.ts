import express, { Request, Response } from "express";

import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import fs from 'fs';
import { imagesToPDF ,extractImages } from "./Utils/pdf-utils";

// === Middlewares ===
import { verifyJWT } from "./Middlewares/auth";


// === Routes ===
import adminUserRouter from "./Routers/admin_users_Routers";
import loginRouter from "./Routers/login_Router";
import is_Auth from "./Routers/isAuthenticated_Router"

import Plans_Router from "./Routers/Plans_Router";
import subscriptions_Router from "./Routers/subscriptions_Router";
import Companies_Router from "./Routers/Companies_Router";
import Sites_Routers from "./Routers/Sites_Routers";
import Roles_Routers from "./Routers/Roles_Routers";
import Employees_Routers from "./Routers/Employees_Routers";

import CheckLists_Router from './Routers/CheckLists_Routers';
import CheckList_Templates_Routers from './Routers/CheckList_Templates_Routers';
import CheckList_Temp_Questions_Routers from './Routers/CheckList_Temp_Questions_Routers';
import Checklist_Question_Answers_Routers from './Routers/Checklist_Question_Answers_Routers';


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
    // origin: 'http://192.168.1.16:3000', 
    // origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Access-Control-Allow-Credentials'] ,
    credentials: true,
    }));
    // ========= CUSTUM MIDDLEWARES =======
    //  app.use(verifyJWT);

    // ========= ROUTES ============
    app.use(is_Auth);
    
    app.use(adminUserRouter);
    app.use(loginRouter);
     
    app.use(Plans_Router);
    app.use(subscriptions_Router);
    app.use(Companies_Router);
    app.use(Sites_Routers);
    app.use(Roles_Routers);
    app.use(Employees_Routers);

    app.use(CheckLists_Router);
    app.use(CheckList_Templates_Routers);
    app.use(CheckList_Temp_Questions_Routers);
    app.use(Checklist_Question_Answers_Routers);


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

const outputDir = path.join(__dirname, "..", "output");
  fs.mkdirSync(outputDir, { recursive: true });

//   app.get('/imgToPDF', async (req: Request, res: Response) => {
//     try {
//       // مسارات الصور الحقيقية
//       const imgs = [
//         path.join(__dirname, "..", "Public", "images", "1.jpg"),
//         // path.join(__dirname, "..", "Public", "images", "2.png"),
//         // ضيف أي صور تانية هنا
//       ];

//       // المسار اللي هيتكتب فيه الـ PDF
//       const pdfPath = path.join(outputDir, "my-images.pdf");

//       // مولّد الـ PDF
//       await imagesToPDF(imgs, pdfPath);
//       console.log('PDF created at', pdfPath);

//       // تنزّل الملف للعميل
//       res.download(pdfPath, "my-images.pdf");
//     } catch (err) {
//       console.error('Error in /imgToPDF:', err);
//       res.status(500).send('حدث خطأ أثناء إنشاء الـ PDF');
//     }
//   });
app.get('/imgToPDF', (req: Request, res: Response) => {
  (async () => {
    try {
      const pdfPath = path.join(__dirname, 'uploads', 'my-images.pdf');
      const images = await extractImages(pdfPath);

      if (!Array.isArray(images) || images.length === 0) {
        return res.status(404).send('لا توجد صور لاستخراجها من الملف.');
      }

      const imagePaths = images.map((image: Buffer, index: number) => {
        const imagePath = path.join(__dirname, 'uploads', `image${index}.png`);
        fs.writeFileSync(imagePath, image);
        return imagePath;
      });

      res.status(200).json({
        message: 'تم تحويل PDF إلى صور بنجاح',
        images: imagePaths,
      });
    } catch (error) {
      console.error('خطأ أثناء تحويل PDF إلى صور:', error);
      res.status(500).send('حدث خطأ أثناء تحويل PDF إلى صور');
    }
  })();
});


    return app;

    
}


