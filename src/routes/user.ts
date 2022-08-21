import Router from 'express';
const route = Router();

import { authlogin } from '../middleware/authlogin';
import {
  createUser,
  logginUser,
  verifyAccount,
  createAccount,
  sendInvite,
  allUser,
  acceptInvite,
  rejectInvite,
} from '../controllers/user';

route.post('/user/signup', createUser);
route.post('/user/login', logginUser);
route.post('/user/account-verification', verifyAccount);
route.post('/user/create-account', authlogin, createAccount);
route.post('/user/send-invite', authlogin, sendInvite);
route.get('/user/getallusers', authlogin, allUser);
route.post('/user/accept-invite', authlogin, acceptInvite);
route.post('/user/accept-invite', authlogin, acceptInvite);
route.post('/user/reject-invite', authlogin, rejectInvite);

export default route;
