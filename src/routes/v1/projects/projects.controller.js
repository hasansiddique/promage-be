import projectsModel from './projects.model';
import Logger from '../../../common/logger/Logger';
import asyncHandler from '../../../middleware/async';

// @desc      create employee
// @route     POST /v1/employee/create
// @access    Private
export const addProject = asyncHandler(async (ctx) => {
  const log = Logger.start({});
  try {
    ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
    // save projects data
    const project = await projectsModel.create(ctx.request.body);
    const newProject = await projectsModel.findById(project.id).populate('manager');
    ctx.status = 201;
    ctx.body = { success: true, status: 'Project Successfully Created', project: newProject };

    log.send({
      Method: 'POST',
      metrics_type: 'add_user',
      message: 'User added successfully.',
      level: 'info',
    });
  } catch (e) {
    if (e && e.code === 11000) {
      ctx.status = 401;
      ctx.body = { success: false, message: 'Project name already exists!' };
    }
    log.send({
      Method: 'POST',
      metrics_type: 'add_user',
      message: `User added failed. Reason ${e}`,
      level: 'info',
    });
  }
});

// @desc      get all projects
// @route     Get /v1/projects/
// @access    Public
export const getAllProjects = asyncHandler(async (ctx) => {
  const projects = await projectsModel.find().populate('manager');
  ctx.status = 200;
  ctx.body = { success: true, length: projects.length, projects };
});

// @desc      get single projects
// @route     Get /v1/projects/:id
// @access    Private
export const getSingleProject = asyncHandler(async (ctx) => {
  const project = await projectsModel.findById(ctx.params.id).populate('manager');
  ctx.assert(project, 404, 'Project not found with this id');
  ctx.status = 200;
  ctx.body = { success: true, project };
});

// @desc      update single projects
// @route     PUT /v1/projects/:id
// @access    Private
export const updateProject = asyncHandler(async (ctx) => {
  const project = await projectsModel.findById(ctx.params.id);
  ctx.assert(project, 404, 'Project not found with this id');

  const newProject = await projectsModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
    new: true, runValidators: true }).populate('manager');
  ctx.status = 200;
  ctx.body = { success: true, status: 'Project Successfully Updated', project: newProject };
});

// @desc      Delete single projects
// @route     DELETE /v1/projects/:id
// @access    Private
export const deleteProject = asyncHandler(async (ctx) => {
  const project = await projectsModel.findById(ctx.params.id);
  ctx.assert(project, 404, 'Project not found with this id');
  project.remove();
  ctx.status = 200;
  ctx.body = { success: true, status: 'Project Successfully Deleted' };
});
