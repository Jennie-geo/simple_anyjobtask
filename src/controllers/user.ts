import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest } from '../middleware/authlogin';
import { Console } from 'console';

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
    return res.status(201).json({ success: true, successMessage: 'user created', data: user });
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
    if (user.verifyAccount !== true) {
      return res.status(400).json({ success: false, errorMessage: 'You have to verify your account to continue' });
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
    const checkerUser = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        verifyAccount: true,
      },
    });
    return res.status(201).json({ success: true, successMessage: 'You have successfully verified your account, you can proceed to login', data: checkerUser });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message });
  }
}

export async function createAccount(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    const user = req.user;
    const { title, numberofbuddy, anyTarget, methodofsaving, savingfrequency, whentostart, howmuchtosave, datetostartsaving, savingTimeLength, startdate, endDate } = req.body;

    const getUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!getUser) {
      return res.status(400).json({ success: false, errorMessage: 'No user found', data: [] });
    }
    console.log('USER', getUser);
    const createAccount = await prisma.account.create({
      data: {
        creatorId: getUser.id,
        title: title,
        numberofbuddy: numberofbuddy,
        methodofsaving: methodofsaving,
        anyTarget: anyTarget,
        savingfrequency: savingfrequency,
        howmuchtosave: howmuchtosave,
        datetostartsaving: datetostartsaving,
        savingTimeLength: savingTimeLength,
        startdate: startdate,
        endDate: endDate,
      },
    });
    return res.status(201).json({ success: true, successMessage: 'Account successfully created', data: createAccount });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message, data: [] });
  }
}

export async function sendInvite(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    const user = req.user;
    const invitee = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (!invitee) {
      return res.status(400).json({ success: false, errorMessage: 'This user does not exist', data: [] });
    }
    const account = await prisma.account.findFirst({ where: { creatorId: user.id } });
    console.log('>>>>> ACOUNT', account);
    if (!account) {
      return res.status(400).json({ success: false, errorMessage: 'You have not created any account', data: [] });
    }
    const { relationshipWithBuddy } = req.body;
    const invite = await prisma.invite.create({
      data: {
        accountId: account.id,
        senderId: req.user.id,
        receiverId: invitee.id,
        relationshipWithBuddy: relationshipWithBuddy,
        methodofsaving: account.methodofsaving,
        savingfrequency: account.savingfrequency,
        startdate: account.startdate,
        howmuchtosave: account.howmuchtosave,
        savingTimeLength: account.savingTimeLength,
      },
    });
    return res.status(200).json({ success: true, successMessage: 'Invite sent successfully', data: invite });
  } catch (error: any) {
    console.log('ERROR', error);
    return res.status(500).json({ success: false, errorMessage: error.message });
  }
}

export async function allUser(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    const user = req.user;
    const allUsers = await prisma.user.findMany();
    if (allUser.length < 1) {
      return res.status(400).json({ success: false, errorMessage: 'No user found', data: [] });
    }
    return res.status(200).json({ success: true, successMessage: 'All users sent successfully', data: allUsers });
  } catch (error: any) {
    return res.status(500).json({ success: false, errorMessage: error.message });
  }
}
