"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.logginUser = exports.createUser = void 0;
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
        return res.status(200).json({ success: true, successMessage: 'user created', data: user });
    }
    catch (error) {
        return res.status(500).json({ success: false, errormessage: error.message });
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
            return res.status(400).json({ success: false, errorMessage: 'This email does not exist', data: [] });
        }
        const matchedPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!matchedPassword) {
            return res.status(400).json({ success: false, errorMessage: 'Password does not match', data: [] });
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
        return res.status(500).json({ success: false, errorMessage: error.message });
    }
}
exports.logginUser = logginUser;
async function createAccount(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {},
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, errorMessage: error.message, data: [] });
    }
}
exports.createAccount = createAccount;
//# sourceMappingURL=user.js.map