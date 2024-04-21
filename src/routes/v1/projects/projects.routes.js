import Router from 'koa-router';

import {
    addProject,
    getSingleProject,
    getAllProjects,
    updateProject,
    deleteProject,
} from './projects.controller';

const router = Router({ prefix: '/projects' });

router.post('/', addProject);
router.get('/', getAllProjects);
router.get('/:id', getSingleProject);
router.put('/:id', updateProject);
router.del('/:id', deleteProject);

export default router;
