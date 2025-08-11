// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction):any => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  console.log("req.path", req.path)
    // === Check The request PATH  ===
    if (req.path === '/login' || req.path === '/login_with_google' || req.path === '/create_admin_account'|| req.path === '/create_admin_account_with_google'|| req.path === '/imgToPDF') {
      return next(); // عدم تطبيق الميدل وير على الـ login و signup
    }
   // === Check if the request has a token ===
    const token = req.cookies.token;
    console.log("req.path", req.path)

  if (!token) {
    console.log("Unauthorized")
    return res.status(401).json({ message: 'Unauthorized',isAuthenticated:false ,err:"No token provided" });
  }


  try {
   const decoded = jwt.verify(token, JWT_SECRET);
   console.log(JWT_SECRET)
    req.user = decoded; // Attach user data to request
    console.log("JWT_SECRET :: ",decoded)
    next();
  } catch (err) {
     res.status(401).json({ message: 'Unauthorized: Invalid token',isAuthenticated:false ,err});
  }
};

// export const generateToken = (user: any) => {
//   return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
// };