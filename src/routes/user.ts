import Router from 'express';
const route = Router();

import { authlogin } from '../middleware/authlogin';
import { createUser, logginUser, verifyAccount, createAccount } from '../controllers/user';

route.post('/user/signup', createUser);
route.post('/user/login', logginUser);
route.post('/user/account-verification', verifyAccount);
route.post('/user/create-account', authlogin, createAccount);
export default route;
