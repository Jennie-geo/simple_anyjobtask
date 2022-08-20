import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface CustomRequest extends Request {
  user?: User;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyAccount: boolean;
}
export function authlogin(req: CustomRequest, res: Response, next: NextFunction): any {
  const token = req.headers['authorization'] || (req.query.authorization as string);
  if (!token) {
    return res.status(403).send('You have to login to continue');
  }
  const tokenBody = token.slice(7);
  jwt.verify(tokenBody, process.env.JWT_SECRET!, async (err, decoded) => {
    if (err) {
      console.log('error', err);
      return res.status(403).send({ Error: 'Access denied' });
    } else {
      const { email } = decoded as {
        email: string;
        iat: number;
        exp: number;
      };

      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return res.send({ login: `No User exists with this ${email}` });
      }
      req.user = user;
      next();
    }
  });
}
