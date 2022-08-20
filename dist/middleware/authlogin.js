"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authlogin = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function authlogin(req, res, next) {
    const token = req.headers['authorization'] || req.query.authorization;
    if (!token) {
        return res.status(403).send('You have to login to continue');
    }
    const tokenBody = token.slice(7);
    jsonwebtoken_1.default.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log('error', err);
            return res.status(403).send({ Error: 'Access denied' });
        }
        else {
            const { email } = decoded;
            const user = await prisma.user.findUnique({ where: { email: email } });
            if (!user) {
                return res.send({ login: `No User exists with this ${email}` });
            }
            req.user = user;
            next();
        }
    });
}
exports.authlogin = authlogin;
//# sourceMappingURL=authlogin.js.map