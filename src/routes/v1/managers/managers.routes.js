import Router from 'koa-router';

import {
    addManager,
    getSingleManager,
    getAllManagers,
    updateManager,
    deleteManager,
} from './managers.controller';

const router = Router({ prefix: '/managers' });

router.post('/', addManager);
router.get('/', getAllManagers);
router.get('/:id', getSingleManager);
router.put('/:id', updateManager);
router.del('/:id', deleteManager);

export default router;
