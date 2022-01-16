import { Router } from 'express';

import pojazdy from './pojazdy';
import kierowcy from './kierowcy';
import trasy from './trasy';
import users from "./users";
import auth from "./auth";
import wyloguj from "./wyloguj";

const router = Router();

router.use('/pojazdy', pojazdy);
router.use('/kierowcy', kierowcy);
router.use('/trasy', trasy);
router.use('/users', users);
router.use('/auth', auth);
router.use('/wyloguj', wyloguj);

export default router;