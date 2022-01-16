import {Router} from 'express';
import {loggOut} from "../../api/auth/auth.controller";

const router = Router();

router.get('/', loggOut);

export default router;
