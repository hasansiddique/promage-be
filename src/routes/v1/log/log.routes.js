import Router from 'koa-router';

import {
    addLog,
    getAllLogs,
} from './log.controller';

const router = Router({ prefix: '/logs' });

router.post('/', addLog);
router.get('/', getAllLogs);

export default router;
