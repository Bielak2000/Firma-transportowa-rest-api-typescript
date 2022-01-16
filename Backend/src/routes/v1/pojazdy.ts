import {Router} from 'express';
import {list, show, add, edit, destroy} from '../../api/pojazdy/pojazdy.controller';

const router = Router();

router.get('/', list);
router.get('/:id', show);
router.post('/', add);
router.put('/:id', edit);
router.delete('/:id([0-9]+)', destroy);
export default router;