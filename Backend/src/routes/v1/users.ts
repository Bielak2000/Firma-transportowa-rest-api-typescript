import {Router} from 'express';
import {register, whoami} from '../../api/users/users.controller';
import {bodyValidate} from "../../middleware";
import {CreateUserDto} from "../../api/users/dro/create-user.dto";
import {token} from "../../middleware/token";


const router = Router();

router.post('/', bodyValidate(CreateUserDto), register);
router.get('/me', token(true), whoami);

export default router;
