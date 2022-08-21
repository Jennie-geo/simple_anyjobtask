import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest } from '../middleware/authlogin';

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

export async function verifyAccount(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, errorMessage: 'Unauthorize' });
    }
    const user = req.user;
    const checkerUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        verifyAccount: true,
      },
    });
    return res.status(200).json({ success: true, successMessage: 'You have successfully verified your account', data: checkerUser });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message });
  }
}

export async function createAccount(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    const date = new Date().toISOString().split('.')[0];
    const time = date.split('T')[1];
    console.log('date', date, 'time', time);
    const user = req.user;
    const { title, methodofsaving, savingfrequency, whentostart, howmuchtosave, datetostartsaving, savingTimeLength, startdate, endDate } = req.body;

    const getUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!getUser) {
      return res.status(400).json({ success: false, errorMessage: 'No user found', data: [] });
    }
    if (getUser.verifyAccount === false) {
      return res.status(400).json({ success: false, errorMessage: 'Your account has not been verified', data: [] });
    }

    const createAccount = await prisma.account.create({
      data: {
        creatorId: user.id,
        title: title,
        methodofsaving: methodofsaving,
        savingfrequency: savingfrequency,
        whentoStart: whentostart,
        howmuchtosave: howmuchtosave,
        datetostartsaving: datetostartsaving,
        savingTimeLength: savingTimeLength,
        startdate: startdate,
        endDate: endDate,
      },
    });
    return res.status(200).json({ success: true, successMessage: 'Account successfully created', data: createAccount });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message, data: [] });
  }
}
