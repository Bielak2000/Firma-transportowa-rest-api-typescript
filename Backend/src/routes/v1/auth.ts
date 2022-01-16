import {Router} from 'express';
import {basicAuth} from "../../api/auth/auth.controller";

const router = Router();

router.post('/', basicAuth);

export default router;
