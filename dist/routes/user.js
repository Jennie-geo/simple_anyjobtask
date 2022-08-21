"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
const authlogin_1 = require("../middleware/authlogin");
const user_1 = require("../controllers/user");
route.post('/user/signup', user_1.createUser);
route.post('/user/login', user_1.logginUser);
route.post('/user/account-verification', user_1.verifyAccount);
route.post('/user/create-account', authlogin_1.authlogin, user_1.createAccount);
route.post('/user/send-invite', authlogin_1.authlogin, user_1.sendInvite);
route.get('/user/getallusers', authlogin_1.authlogin, user_1.allUser);
exports.default = route;
//# sourceMappingURL=user.js.map