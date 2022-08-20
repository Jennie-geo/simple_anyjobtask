import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userInfo } from 'os';
dotenv.config();
const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
      },
    });
    return res.status(200).json({ success: true, successMessage: 'user created', data: user });
  } catch (error: any) {
    return res.status(500).json({ success: false, errormessage: error.message });
  }
}

export async function logginUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({ success: false, errorMessage: 'This email does not exist', data: [] });
    }
    const matchedPassword = await bcrypt.compare(req.body.password, user.password);
    if (!matchedPassword) {
      return res.status(400).json({ success: false, errorMessage: 'Password does not match', data: [] });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '2h',
    });

    return res.status(200).json({
      success: true,
      message: 'Auth successful',
      token: token,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message });
  }
}
export async function createAccount(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {},
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message, data: [] });
  }
}
