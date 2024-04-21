import Router from 'koa-router';

import {
    addTask,
    getSingleTask,
    getAllTasks,
    updateTask,
    deleteTask, getAllTasksByProjectId,
} from './tasks.controller';

const router = Router({ prefix: '/tasks' });

router.get('/projects/:id', getAllTasksByProjectId);
router.get('/:id', getSingleTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.del('/:id', deleteTask);
router.post('/', addTask);

export default router;
