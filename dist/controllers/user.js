"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectInvite = exports.acceptInvite = exports.allUser = exports.sendInvite = exports.createAccount = exports.verifyAccount = exports.logginUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
async function createUser(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
            },
        });
        return res
            .status(201)
            .json({ success: true, successMessage: 'user created', data: user });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errormessage: error.message });
    }
}
exports.createUser = createUser;
async function logginUser(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                errorMessage: 'This email does not exist',
                data: [],
            });
        }
        if (user.verifyAccount !== true) {
            return res.status(400).json({
                success: false,
                errorMessage: 'You have to verify your account to continue',
            });
        }
        const matchedPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!matchedPassword) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Password does not match',
                data: [],
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
        return res.status(200).json({
            success: true,
            message: 'Auth successful',
            token: token,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message });
    }
}
exports.logginUser = logginUser;
async function verifyAccount(req, res) {
    try {
        const checkerUser = await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                verifyAccount: true,
            },
        });
        return res.status(201).json({
            success: true,
            successMessage: 'You have successfully verified your account, you can proceed to login',
            data: checkerUser,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message });
    }
}
exports.verifyAccount = verifyAccount;
async function createAccount(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorize' });
        }
        const user = req.user;
        const { title, numberofbuddy, anyTarget, methodofsaving, savingfrequency, whentostart, howmuchtosave, datetostartsaving, savingTimeLength, startdate, endDate, } = req.body;
        const getUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (!getUser) {
            return res
                .status(400)
                .json({ success: false, errorMessage: 'No user found', data: [] });
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
        return res.status(201).json({
            success: true,
            successMessage: 'Account successfully created',
            data: createAccount,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message, data: [] });
    }
}
exports.createAccount = createAccount;
async function sendInvite(req, res) {
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
            return res.status(400).json({
                success: false,
                errorMessage: 'This user does not exist',
                data: [],
            });
        }
        const account = await prisma.account.findFirst({
            where: { creatorId: user.id },
        });
        console.log('>>>>> ACOUNT', account);
        if (!account) {
            return res.status(400).json({
                success: false,
                errorMessage: 'You have not created any account',
                data: [],
            });
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
        return res.status(200).json({
            success: true,
            successMessage: 'Invite sent successfully',
            data: invite,
        });
    }
    catch (error) {
        console.log('ERROR', error);
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message });
    }
}
exports.sendInvite = sendInvite;
async function allUser(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorize' });
        }
        const user = req.user;
        const allUsers = await prisma.user.findMany();
        if (allUser.length < 1) {
            return res
                .status(400)
                .json({ success: false, errorMessage: 'No user found', data: [] });
        }
        return res.status(200).json({
            success: true,
            successMessage: 'All users sent successfully',
            data: allUsers,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message });
    }
}
exports.allUser = allUser;
async function acceptInvite(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorize' });
        }
        const user = req.user;
        const userInvite = await prisma.invite.update({
            where: {
                receiverId: user.id,
            },
            data: {
                status: 'ACCEPTED',
                isPending: false,
            },
        });
        return res.status(200).json({
            success: true,
            successMessage: 'Invite accepted',
            data: userInvite,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message, data: [] });
    }
}
exports.acceptInvite = acceptInvite;
async function rejectInvite(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorize' });
        }
        const user = req.user;
        const userInvite = await prisma.invite.update({
            where: {
                receiverId: user.id,
            },
            data: {
                isPending: false,
            },
        });
        if (!userInvite) {
            return res
                .status(400)
                .json({ success: false, errorMessage: 'No invite found', data: [] });
        }
        if (userInvite.status === 'ACCEPTED') {
            return res.status(400).json({
                success: false,
                errorMessage: 'you have no invite to accept',
                data: [],
            });
        }
        return res.status(200).json({
            success: true,
            successMessage: 'Invite reject',
            data: userInvite,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, errorMessage: error.message, data: [] });
    }
}
exports.rejectInvite = rejectInvite;
//# sourceMappingURL=user.js.map