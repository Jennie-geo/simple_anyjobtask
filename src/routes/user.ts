import Router from 'express';
const route = Router();

import { createUser, logginUser } from '../controllers/user';

route.post('/user/signup', createUser);
route.post('/user/login', logginUser);

export default route;
